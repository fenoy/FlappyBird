// Load canvas
let canvas = document.getElementById('window');
let ctx = canvas.getContext('2d');

// Params
const params = {
    't': 2,
    'g': 0.1
};

let score = 0;

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
        this.x += this.vx * params.t;
        this.y += this.vy * params.t;
    }

    updateVelocity (ax, ay) {
        this.vx += ax * params.t;
        this.vy += ay * params.t;
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

let fg = [
    new Item(
        "./img/fg.png",
        0, 0.75 * canvas.height,
        canvas.width, 0.25 * canvas.height,
        -params.t, 0
    )
];

let gapY = 0.1 * canvas.height + ((0.75 - 0.1 - 0.2) * canvas.height * Math.random());
let pipe = [
    {
        'top': new Item("./img/pipeTop.png",
            canvas.width, gapY - canvas.height,
            0.1 * canvas.width, canvas.height,
            -params.t, 0
        ),
        'bot': new Item("./img/pipeBot.png",
            canvas.width, gapY + 0.2 * canvas.height,
            0.1 * canvas.width, canvas.height,
            -params.t, 0
        )
    }
];

// Draw images
async function draw () {

    // Load images
    bg.loadImage();
    bird.loadImage();
    pipe.forEach((item) => {
        item.top.loadImage();
        item.bot.loadImage()
    });
    fg.forEach((item) => {item.loadImage()});

    // Print score
    ctx.fillStyle = "#000000";
    ctx.font = "30px Arial";
    ctx.fillText("Score : " + score, 20, canvas.height-20);


    // Add and remove items from queues
    if (fg[fg.length - 1].x === 0) {
        fg.push(
            new Item(
                "./img/fg.png",
                canvas.width, 0.75 * canvas.height,
                canvas.width, 0.25 * canvas.height,
                -params.t, 0
            )
        )
    }

    if (fg[0].x === -canvas.width) {
        fg.shift()
    }

    if (pipe[pipe.length - 1].top.x === 0.5 * canvas.width) {
        gapY = 0.1 * canvas.height + ((0.75 - 0.1 - 0.2) * canvas.height * Math.random());
        pipe.push(
            {
                'top': new Item("./img/pipeTop.png",
                    canvas.width, gapY - canvas.height,
                    0.1 * canvas.width, canvas.height,
                    -params.t, 0
                ),
                'bot': new Item("./img/pipeBot.png",
                    canvas.width, gapY + 0.2 * canvas.height,
                    0.1 * canvas.width, canvas.height,
                    -params.t, 0
                )
            }
        );
    }

    if (pipe[0].top.x === -0.2 * canvas.width)  {
        pipe.shift()
    }

    // Update position and velocity
    bird.updateVelocity(0, params.g);

    bird.updatePosition();
    pipe.forEach((item) => {
        item.top.updatePosition();
        item.bot.updatePosition()
    });
    fg.forEach((item) => {item.updatePosition()});

    // Update score
    if (pipe[0].top.x + pipe[0].top.width === bird.x + bird.width) {
        score++
    }

    // Draw next frame
    if (
        (bird.x + bird.width - 10 < pipe[0].top.x || bird.x + 10 > pipe[0].top.x + pipe[0].top.width)
        || (bird.y + 10 > pipe[0].top.y + pipe[0].top.height && bird.y + bird.height - 10 < pipe[0].bot.y)

    ) {requestAnimationFrame(draw)} else {
        await sleep(500);
        endScreen()
    }
}

function endScreen() {
    // Load text
    ctx.textAlign = "center";

    ctx.fillStyle = "#ff0000";
    ctx.font = "70px Arial";
    ctx.fillText("GAME OVER ", 0.5 * canvas.width, 0.4 * canvas.height);

    ctx.fillStyle = "#000000";
    ctx.font = "30px Arial";
    ctx.fillText("Press any key to play again ", 0.5 * canvas.width, 0.5 * canvas.height);

    ctx.textAlign = "left";
    ctx.fillStyle = "#000000";
    ctx.font = "30px Arial";
    ctx.fillText("Score : " + score, 20, canvas.height-20);

    // Reload option
    document.addEventListener('keydown', () => {
        location.reload()
    })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener('DOMContentLoaded', draw);
document.addEventListener('keydown', () => {bird.vy = -40 * params.g});