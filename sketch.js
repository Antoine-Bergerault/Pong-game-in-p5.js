var leftbar, rightbar;
var ball, go = true;
var game = true;
var player = 2;
var keynum;
function setup() {
    createCanvas(800, 500);
    leftbar = new Bar(15);
    rightbar = new Bar(765);
    ball = new Ball();
}
function draw() {
    background(51);
    leftbar.show();
    rightbar.show();
    if (game) {
        ball.update();
    }
    ball.show();
    if (player === 1) {
        document.addEventListener('mousemove', onMouseMove, false);
    }
}

function keyPressed() {
    if (player === 2) {
        if (keyCode === UP_ARROW) {
            rightbar.y -= 40;
        } else if (keyCode === DOWN_ARROW) {
            rightbar.y += 40;
        } else if (keyCode === 65) {
            leftbar.y -= 40;
        } else if (keyCode === 81) {
            leftbar.y += 40;
        }
    }
}


function Bar(x) {
    this.height = 140
    this.x = x;
    this.y = 250 - this.height / 2;

    this.show = function () {
        fill(255);
        rect(this.x, this.y, 20, this.height);
    }
}
function onMouseMove(event) {
    var MouseY = event.clientY;
    var MouseX = event.clientX;
    if (MouseX >= 400) {
        rightbar.y = MouseY;
    }
    else {
        leftbar.y = MouseY
    }
}
function Ball() {
    this.height = 20;
    this.x = 400;
    this.y = 250 - this.height / 2;
    this.speed = 3.5;
    this.hSpeed = 0;


    this.update = function () {
        if (this.x <= 35) {
            if (this.y > leftbar.y + leftbar.height || this.y < leftbar.y) {
                //game = false;
                ball = new Ball();
            }
            else {
                go = true;
                ball.changeDirection();
            }
        }
        else if (this.x >= 745) {
            if (this.y > rightbar.y + rightbar.height || this.y < rightbar.y) {
                //game = false;
                ball = new Ball();
            }
            else {
                go = false;
                ball.changeDirection();
            }
        }

        if (go) {
            this.x += this.speed;
            this.y -= this.hSpeed;
            if (this.y < 0 || this.y > 500 - this.height / 2) {
                this.hSpeed = -this.hSpeed;
            }
        }
        else {
            this.x -= this.speed;
            this.y -= this.hSpeed;
            if (this.y < 0 || this.y > 500 - this.height / 2) {
                this.hSpeed = -this.hSpeed;
            }
        }
    }

    this.show = function () {
        fill(255);
        rect(this.x, this.y, this.height, this.height);
    }
    this.changeDirection = function () {
        var r = Math.random() * 15;
        var h = 770 / Math.sin(r);
        var y = 770 / ball.speed;
        this.hSpeed = h / y;
    }
}