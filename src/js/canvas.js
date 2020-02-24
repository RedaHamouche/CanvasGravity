import utils from "./utils";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

let gravity = 1;
let friction = 0.93;

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

// Event Listeners
addEventListener("mousemove", event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

addEventListener("click", () => {
  animate();
});

// Objects
class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * friction;
    } else {
      this.dy += gravity;
    }
    if (
      this.x + this.radius + this.dx > canvas.width ||
      this.x - this.radius < 0
    ) {
      this.dx = -this.dx * friction;
    }
    this.y += this.dy;
    this.x += this.dx;
  }
}

// Implementation
let objects;
let ballArray = [];
function init() {
  for (let i = 0; i < 100; i++) {
    let x = randomIntFromRange(0, canvas.width - radius);
    let y = randomIntFromRange(0, canvas.height / 2);
    let dy = randomIntFromRange(1, 4);
    let dx = randomIntFromRange(-2, 2);
    let radius = randomIntFromRange(8, 20);
    ballArray.push(
      new Ball(
        x,
        y,
        dx,
        dy,
        radius,
        colors[randomIntFromRange(1, colors.length)]
      )
    );
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < ballArray.length; i++) {
    ballArray[i].update();
  }
  c.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y);
}

init();
animate();
