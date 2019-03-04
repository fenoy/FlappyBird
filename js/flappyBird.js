// Load canvas
let canvas = document.getElementById('window');
let ctx = canvas.getContext('2d');

const params = {
    'fps':  30,
    'g': 9.8
};

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
        this.x += this.vx * (1 / params.fps);
        this.y += this.vy * (1 / params.fps);
    }

    updateVelocity () {
        this.vx += ax * (1 / params.fps);
        this.vy += ay * (1 / params.fps);
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

let fg = new Item(
    "./img/fg.png",
    0, 0.75 * canvas.height,
    canvas.width, 0.25 * canvas.height
);

let bird = new Item(
    "./img/bird.png",
    0.3 * canvas.width, 0.3 * canvas.height,
    60, 50
);

// Draw images
function draw () {
    bg.loadImage();
    fg.loadImage();
    bird.loadImage();

    setTimeout(() => {
        requestAnimationFrame(draw);
    }, 1000 / params.fps);
}

document.addEventListener('DOMContentLoaded', draw());