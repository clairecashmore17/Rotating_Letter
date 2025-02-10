"use strict";
var canvas;
var gl;

// Set the theta that will be altered to rotate letter


var theta = 0.0;
var thetaLoc;
var fColorLocation;
// delay (or n) is the number of frames we load at
var delay = 10;

//cindex is how we will change the colors
var cindex = 1.0;



// r b g values (a will always be 1)
var r, b, g;
//Run this once the page has loaded
window.onload = function init() {

    //Draw canvas
    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    //Configure Viewport and clear color
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    //  Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    //Vertices needed to make H
    var vertices = [
        vec2(-.5, .5),
        vec2(-.5, -.5),
        vec2(-.5, 0),
        vec2(.5, 0),
        vec2(.5, .5),
        vec2(.5, 0),
        vec2(.5, -.5)
    ];


    // Create a buffer object, initialize it, and associate it with the
    //load into the GPU
    var bufferID = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferID);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);



    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);




    // identify location for uniform value fColor
    // Using uniform because the entire shape (all points) will be the same color
    fColorLocation = gl.getUniformLocation(program, "fColor");




    // returns the location of a specific uniform variable whic is part of webGl
    //Program - ties back to the shaders
    // name - string specifying the name of the uniform variable
    thetaLoc = gl.getUniformLocation(program, "theta");
    // console.log(fColorLocation);
    render();

}

function render() {
    //increase theta to rotate shape
    theta += 0.01;
    //use timeout for FPS
    setTimeout(function () {
        //Concept: switch between different color vecs when cindex increases.
        if (cindex <= 3) {
            switch (cindex) {
                case 0:
                    r = 1.0;
                    b = 0.0;
                    g = 0.0;
                    break;
                case 1:
                    r = 0.0;
                    b = 1.0;
                    g = 0.0;
                    break;
                case 2:
                    r = 0.0;
                    b = 0.0;
                    g = 1.0;
                    break;
            }
        }
        else {
            //reset cindex to start at first r g b vertex;
            cindex = -1;
        }


        // Clear to buffer bit
        gl.clear(gl.COLOR_BUFFER_BIT);
        

        //increase cindex so that we go into different color vector
        cindex++;
        // send uniform value to vertex shader
        gl.uniform1f(thetaLoc, theta);
        //send uniform value to fragment shader
        gl.uniform4f(fColorLocation, r, b, g, 1.0);

        //draw the shape
        gl.drawArrays(gl.LINE_STRIP, 0, 7);
       
        //request animation aka render
        window.requestAnimationFrame(render);
      



    }, 1000 / delay);


}