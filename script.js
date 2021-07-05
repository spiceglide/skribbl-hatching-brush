// ==UserScript==
// @name         Skribbl.io Hatching Brush
// @match        *://skribbl.io/*
// @grant        none
// ==/UserScript==

const canvas = document.querySelector("#canvasGame");

// Settings
const setKey = "KeyW";  // Key used to toggle the brush.
const delay = 20;  // Milliseconds between each stroke.

let toggle = false;
let mousePressed = false;
let origin = {"x": 0, "y": 0};

// Toggle the tool on and off
function toggleTool(event) {
    if (event.code === setKey && document.activeElement.id !== "inputChat") {
        toggle = !toggle;
    }
}

// Record coordinates of the last click
function findMouseXY(event) {
    if (document.elementFromPoint(event.clientX, event.clientY) === canvas) {
        origin.x = event.clientX;
        origin.y = event.clientY;
    }
}

// Keep making strokes between cursor and origin point
function hatch() {
    if (toggle && mousePressed) {
        let event = document.createEvent("MouseEvents");
        event.initEvent("mousemove", true, true);
        Object.defineProperty(event, "clientX", {value: origin.x});
        Object.defineProperty(event, "clientY", {value: origin.y});
        canvas.dispatchEvent(event);
        setTimeout(hatch, delay);
    }
}

document.addEventListener("mousedown", function() {mousePressed = true; hatch()});
document.addEventListener("mouseup", function() {mousePressed = false});
document.addEventListener("mouseup", findMouseXY)
document.addEventListener("keydown", toggleTool);
