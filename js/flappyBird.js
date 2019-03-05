// Load canvas
let canvas = document.getElementById('window');
let ctx = canvas.getContext('2d');

// Params
const params = {
    'fps': 30,
    't': 10,
    'g': 10
};

// Objects
class Item {
    constructor(imagePath, x, y, width, height, vx=0, vy=0) {
        this.imagePath = imagePath;
        this.width = width;
        this.height = height;

        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
    }

    updatePosition () {
        this.x += this.vx * (params.t / params.fps);
        this.y += this.vy * (params.t / params.fps);
    }

    updateVelocity (ax, ay) {
        this.vx += ax * (params.t / params.fps);
        this.vy += ay * (params.t / params.fps);
    }

    loadImage () {
        let img = new Image();
        img.src = this.imagePath;
        img.onload = () => {
            ctx.drawImage(img, this.x, this.y, this.width, this.height)
        }
    }
}

// Images
let bg = new Item(
    "./img/bg.png",
    0, 0,
    canvas.width, canvas.height
);

let bird = new Item(
    "./img/bird.png",
    0.2 * canvas.width, 0.3 * canvas.height,
    60, 50
);

let fg = new Item(
    "./img/fg.png",
    0, 0.75 * canvas.height,
    canvas.width, 0.25 * canvas.height
);

// Draw images
function draw () {

    // Load images
    bg.loadImage();
    bird.loadImage();
    fg.loadImage();

    // Update position and velocity
    bird.updateVelocity(0, params.g);

    bird.updatePosition();

    // Draw next frame
    setTimeout(() => {
        requestAnimationFrame(draw);
    }, 1000 / params.fps);
}

document.addEventListener('DOMContentLoaded', draw());
document.addEventListener('keydown', () => {bird.vy = -40});