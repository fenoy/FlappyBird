// Load canvas
var canvas = document.getElementById('window');
var ctx = canvas.getContext('2d');

// Images
var bg = new Image();
var fg = new Image();

bg.src = "img/bg.png";
fg.src = "img/fg.png";

// Draw images
function draw () {
    bg.onload = () => {
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)
    };

    fg.onload = () => {
        ctx.drawImage(fg, 0, 0.8 * canvas.height, canvas.width, canvas.height)
    }
}

document.addEventListener('DOMContentLoaded', draw());