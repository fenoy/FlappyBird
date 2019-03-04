import {params, Item} from '/params';

// Load canvas
let canvas = document.getElementById('window');
let ctx = canvas.getContext('2d');

// Images
let bg = new Item(
    "/img/bg.png",
    0, 0,
    canvas.width, canvas.height
);

let fg = new Item(
    "/img/fg.png",
    0, 0.75 * canvas.width,
    canvas.width, 0.25 * canvas.height
);

let bird = new Bird(
    "/img/bird.png",
    0.3 * canvas.width, 0.3 * canvas.height,
    80, 80
);

// Draw images
function draw () {
    bg.loadImage;
    fg.loadImage;
    bird.loadImage;

    setTimeout(() => {
        requestAnimationFrame(draw);
    }, 1000 / params.fps);
}

document.addEventListener('DOMContentLoaded', draw());