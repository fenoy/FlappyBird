import {params, Item} from '/params';

// Load canvas
let canvas = document.getElementById('window');
let ctx = canvas.getContext('2d');

// Images
let bg = new Item("/img/bg.png", 0, 0, canvas.width, canvas.height);
let fg = new Item("/img/fg", 0, 0.75 * canvas.width, 0.75 * canvas.height);

// Draw images
function draw () {
    bg.loadImage;
    fg.loadImage;

    setTimeout(() => {
        requestAnimationFrame(draw);
    }, 1000 / params.fps);
}

document.addEventListener('DOMContentLoaded', draw());