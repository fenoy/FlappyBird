// Load canvas
var canvas = document.getElementById('window');
var ctx = canvas.getContext('2d');

// Images
var bg = new Image();

bg.src = "img/bg.png";

// Draw images
function draw () {
    bg.onload = () => {
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)
    }
}