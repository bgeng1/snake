type Direction = "up" | "down" | "left" | "right";

interface Rectangle {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Node {
  x: string;
  y: string;
  prev: Node;
}

export class Snake {
  private direction: Direction = "right";
  private length = 0;
  private ctx: CanvasRenderingContext2D;
  private headX: number = 500;
  private headY: number = 500;
  private speed: number = 3;
  private width: number = 50;
  private canvasHeight: number;
  private canvasWidth: number;
  private fruitX = 200;
  private fruitY = 200;

  constructor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw Error("snake class error: cant get canvas context");
    }
    this.canvasHeight = canvas.height;
    this.canvasWidth = canvas.width;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.fillStyle = "rgb(255, 0, 0)";
    this.ctx.fillRect(this.headX, this.headY, this.width, this.width);

    this.ctx.fillStyle = "rgb(255, 210, 0)";
    this.ctx.fillRect(this.fruitX, this.fruitY, this.width, this.width);
  }

  update() {
    switch (this.direction) {
      case "up":
        this.headY -= this.speed;
        break;
      case "down":
        this.headY += this.speed;
        break;
      case "left":
        this.headX -= this.speed;
        break;
      case "right":
        this.headX += this.speed;
        break;
    }
  }

  detectCollisions() {
    if (
      this.headX + this.width >= this.canvasWidth ||
      this.headY + this.width >= this.canvasHeight ||
      this.headX <= 0 ||
      this.headY <= 0
    ) {
      //boom
      this.speed = 0;
    }
    if (
      this.detectEntityCollisions(
        { x: this.headX, y: this.headY, w: this.width, h: this.width },
        { x: this.fruitX, y: this.fruitY, w: this.width, h: this.width }
      )
    ) {
      this.generateFruit();
    }
  }

  setDirection(direction: Direction) {
    this.direction = direction;
  }

  generateFruit() {
    this.fruitX = Math.floor(Math.random() * this.canvasWidth - this.width);
    this.fruitY = Math.floor(Math.random() * this.canvasHeight - this.width);
  }

  private detectEntityCollisions(rect1: Rectangle, rect2: Rectangle) {
    if (
      rect1.x < rect2.x + rect2.w &&
      rect1.x + rect1.w > rect2.x &&
      rect1.y < rect2.y + rect2.h &&
      rect1.h + rect1.y > rect2.y
    ) {
      // Collision detected
      return true;
    } else {
      // No collision
      return false;
    }
  }
}
