export class Main {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  images: HTMLImageElement[];
  width: number;
  height: number;
  fps: number;
  interval: number;
  startTime: number;
  previousTime: number;
  currentTime: number;
  deltaTime: number;

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    images: HTMLImageElement[],
  ) {
    this.canvas = canvas;
    this.ctx = context;
    this.images = images;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.fps = 5;
    this.interval = Math.floor(1000 / this.fps);
    this.startTime = performance.now();
    this.previousTime = this.startTime;
    this.currentTime = 0;
    this.deltaTime = 0;
  }

  start() {
    console.log(this.images[0]);
    this.ctx.drawImage(
      this.images[0],
      0,
      0
    );
  }
}