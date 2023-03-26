type Direction = "up" | "down" | "left" | "right";

// interface Rectangle {
//   x: number;
//   y: number;
//   w: number;
//   h: number;
// }

interface Node {
  x: number;
  y: number;
}

export class Snake {
  private direction: Direction = "right";
  private nextDirection: Direction = "right";
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
      this.ctx.fillStyle = "rgb(0, 150, 0)";
      this.ctx.fillRect(node.x, node.y, this.width, this.width);
    }

    this.ctx.fillStyle = "rgb(255, 210, 0)";
    this.ctx.fillRect(this.fruitX, this.fruitY, this.width, this.width);
  }

  update() {
    let newHead = {
      x: this.body[0].x,
      y: this.body[0].y,
    };

    this.direction = this.nextDirection;
    switch (this.direction) {
      case "up":
        newHead.y -= this.speed;
        break;
      case "down":
        newHead.y += this.speed;
        break;
      case "left":
        newHead.x -= this.speed;
        break;
      case "right":
        newHead.x += this.speed;
        break;
    }

    var tail = this.body.pop();
    tail!.x = newHead.x;
    tail!.y = newHead.y;
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

    for (let i = 1; i < this.body.length; i++) {
      if (
        this.detectGridCollision(
          {
            x: head.x,
            y: head.y,
          },
          {
            x: this.body[i].x,
            y: this.body[i].y,
          }
        )
      ) {
        this.gameOver();
      }
    }

    if (
      this.detectGridCollision(
        {
          x: head.x,
          y: head.y,
        },
        {
          x: this.fruitX,
          y: this.fruitY,
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
    this.ctx.font = "35px georgia";
    this.ctx.fillText(`space bar to restart`, 320, 350);
  }

  //dont mutate direction directly else you can break these directions rules between updates
  setDirection(direction: Direction) {
    if (direction === "down" && this.direction !== "up") {
      this.nextDirection = "down";
    }
    if (direction === "up" && this.direction !== "down") {
      this.nextDirection = "up";
    }
    if (direction === "right" && this.direction !== "left") {
      this.nextDirection = "right";
    }
    if (direction === "left" && this.direction !== "right") {
      this.nextDirection = "left";
    }
  }

  generateFruit() {
    const squaresY = this.canvasHeight / this.width;
    const squaresX = this.canvasWidth / this.width;
    this.fruitX = Math.floor(Math.random() * (squaresX - 1)) * this.width;
    this.fruitY = Math.floor(Math.random() * (squaresY - 1)) * this.width;
  }

  // private detectEntityCollision(rect1: Rectangle, rect2: Rectangle) {
  //   if (
  //     rect1.x < rect2.x + rect2.w &&
  //     rect1.x + rect1.w > rect2.x &&
  //     rect1.y < rect2.y + rect2.h &&
  //     rect1.h + rect1.y > rect2.y
  //   ) {
  //     // Collision detected
  //     return true;
  //   } else {
  //     // No collision
  //     return false;
  //   }
  // }

  private detectGridCollision(node1: Node, node2: Node) {
    if (node1.x === node2.x && node1.y === node2.y) {
      return true;
    }
    return false;
  }
}
