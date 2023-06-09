import { Snake } from "./snake";

/* canvas reference
  ctx.fillStyle = "rgb(0, 100, 0)";
  ctx.fillRect(0, 0, 100, 100);

  ctx.fillStyle = "rgb(255, 0, 0)";
  ctx.fillRect(50, 50, 100, 150);

  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.lineWidth = 5;
  ctx.strokeRect(0, 0, width, height);
  
  ctx.fillStyle = "red";
  ctx.font = "48px georgia";
  ctx.fillText("Canvas text", 500, 150);
  */

const height = 1000;
const width = 1000;
let gameInterval: number;

const canvas = document.querySelector("canvas");

if (!canvas) {
  throw Error("cant find html canvas element");
}

window.addEventListener("keydown", (event) => {
  const { key } = event;
  if (key === "ArrowUp") {
    snake.setDirection("up");
  }
  if (key === "ArrowDown") {
    snake.setDirection("down");
  }
  if (key === "ArrowLeft") {
    snake.setDirection("left");
  }
  if (key === "ArrowRight") {
    snake.setDirection("right");
  }
  if (key === " ") {
    clearInterval(gameInterval);
    gameInterval = setInterval(() => {
      loop();
    }, 100);
    snake = new Snake(canvas, gameInterval);
  }
});

const ctx = canvas.getContext("2d");
canvas.width = width;
canvas.height = height;

gameInterval = setInterval(() => {
  loop();
}, 100);
let snake = new Snake(canvas, gameInterval);

const loop = () => {
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);

  //update snake
  snake.update();
  //draw snake
  snake.draw();
  //detect collision
  snake.detectCollisions();
};
