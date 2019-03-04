const params = {
    'fps':  30,
    'g': 1,
};

class Item {
    constructor(imagePath, x, y, width, height) {
        this.imagePath = imagePath;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    get loadImage() {
        let img = new Image();
        img.src = this.imagePath;
        img.onload = () => {
            img.drawImage(img, this.x, this.y, this.width, this.height)
        };
    }
}

class Bird extends Item {
    constructor(imagePath, x, y, width, height) {
        super(imagePath, x, y, width, height);

        this.vx = vx;
        this.vy = vy;
    }
}

export {params, Item}