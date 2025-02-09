"use strict";
var canvas;
var gl;

// Set the theta that will be altered to rotate letter


var theta = 0.0;
var thetaLoc;
var delay = 1000;

var cindex = 1.0;
var index = 0;
var t;
//Colors array
var colors = [

    vec4(0.0, 1.0, 0.0, 1.0),  // black
    vec4(0.0, 1.0, 0.0, 1.0),  // red
    vec4(0.0, 1.0, 0.0, 1.0),   // yellow
    vec4(0.0, 1.0, 0.0, 1.0),   // green
    vec4(0.0, 1.0, 0.0, 1.0),  // blue
    vec4(0.0, 1.0, 0.0, 1.0), // magenta
    vec4(0.0, 1.0, 0.0, 1.0),    // cyan
    vec4(0.0, 1.0, 0.0, 1.0), 
];
var color = vec4(1.0,0.0,0.0,1.0);
//Run this once the page has loaded
window.onload = function init() {

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
    //  associated attribute variable in our vertex shader
    console.log(colors[cindex ]);
    console.log(color);

    //load into the GPU
    var bufferID = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferID);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);



    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 3, gl.FLOAT, true, 16, 12);
    gl.enableVertexAttribArray(vColor);
  



    cindex++;


    // returns the location of a specific uniform variable whic is part of webGl
    //Program - ties back to the shaders
    // name - string specifying the name of the uniform variable
    thetaLoc = gl.getUniformLocation(program, "theta");

    render();

}

function render() {
    setTimeout(function () {
    
    gl.clear(gl.COLOR_BUFFER_BIT);

    theta += 0.01;

    gl.uniform1f(thetaLoc, theta);

    gl.drawArrays(gl.LINE_STRIP, 0, 7);
    //setTimeout( render ,delay);
    window.requestAnimationFrame(render);
    }, delay);


}