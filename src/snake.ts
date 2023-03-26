type Direction = "up" | "down" | "left" | "right";

interface Rectangle {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Node {
  x: number;
  y: number;
}

export class Snake {
  private direction: Direction = "right";
  private ctx: CanvasRenderingContext2D;
  private headNode: Node = {
    x: 500,
    y: 500,
  };
  private body: Node[] = [this.headNode];
  private width: number = 25;
  private speed: number = this.width;
  private canvasHeight: number;
  private canvasWidth: number;
  private fruitX = 400;
  private fruitY = 400;
  private interval: number;
  private score = 0;

  constructor(canvas: HTMLCanvasElement, interval: number) {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw Error("snake class error: cant get canvas context");
    }
    this.canvasHeight = canvas.height;
    this.canvasWidth = canvas.width;
    this.ctx = ctx;
    this.interval = interval;
  }

  draw() {
    for (const node of this.body) {
      this.ctx.fillStyle = "rgb(255, 0, 0)";
      this.ctx.fillRect(node.x, node.y, this.width, this.width);
    }

    this.ctx.fillStyle = "rgb(255, 210, 0)";
    this.ctx.fillRect(this.fruitX, this.fruitY, this.width, this.width);
  }

  update() {
    let head = this.body[0];

    switch (this.direction) {
      case "up":
        head.y -= this.speed;
        break;
      case "down":
        head.y += this.speed;
        break;
      case "left":
        head.x -= this.speed;
        break;
      case "right":
        head.x += this.speed;
        break;
    }

    var tail = this.body.pop();
    tail!.x = head.x;
    tail!.y = head.y;
    this.body.unshift(tail!);
  }

  detectCollisions() {
    const head = this.body[0];
    if (
      //add a buffer to each side otherwise its impossible
      head.x >= this.canvasWidth ||
      head.y >= this.canvasHeight ||
      head.x <= -1 ||
      head.y <= -1
    ) {
      this.gameOver();
    }

    for (let i = 2; i < this.body.length; i++) {
      if (
        this.detectEntityCollisions(
          {
            x: head.x,
            y: head.y,
            w: this.width,
            h: this.width,
          },
          {
            x: this.body[i].x,
            y: this.body[i].y,
            w: this.width,
            h: this.width,
          }
        )
      ) {
        this.gameOver();
      }
    }

    if (
      this.detectEntityCollisions(
        {
          x: head.x,
          y: head.y,
          w: this.width,
          h: this.width,
        },
        {
          x: this.fruitX,
          y: this.fruitY,
          w: this.width,
          h: this.width,
        }
      )
    ) {
      this.generateFruit();
      this.body.push({
        x: head.x,
        y: head.y,
      });
      this.score += 10;
    }
  }

  gameOver() {
    clearInterval(this.interval);
    this.ctx.fillStyle = "red";
    this.ctx.font = "48px georgia";
    this.ctx.fillText(`Game Over. Score: ${this.score}`, 250, 150);
  }

  setDirection(direction: Direction) {
    if (direction === "down" && this.direction !== "up") {
      this.direction = "down";
    }
    if (direction === "up" && this.direction !== "down") {
      this.direction = "up";
    }
    if (direction === "right" && this.direction !== "left") {
      this.direction = "right";
    }
    if (direction === "left" && this.direction !== "right") {
      this.direction = "left";
    }
  }

  generateFruit() {
    this.fruitX = Math.floor(
      Math.random() * (this.canvasWidth - this.width - 500)
    );
    this.fruitY = Math.floor(
      Math.random() * (this.canvasHeight - this.width - 500)
    );
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
