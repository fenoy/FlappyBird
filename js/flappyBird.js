import {params, Item} from '/params';

// Load canvas
let canvas = document.getElementById('window');
let ctx = canvas.getContext('2d');

// Images
let bg = new Item();
let fg = new Item();

// Draw images
function draw () {
    bg.loadImage;
    fg.loadImage;

    setTimeout(() => {
        requestAnimationFrame(draw);
    }, 1000 / params.fps);
}

document.addEventListener('DOMContentLoaded', draw());