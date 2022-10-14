import { Drawable } from './drawable';

export class ShipFigure implements Drawable {
  private imgEngineOff: HTMLImageElement;
  private imgEngineOn: HTMLImageElement;
  private img: HTMLImageElement;
  private ctx: CanvasRenderingContext2D;
  private x: number;
  private y: number;
  private w: number;
  private h: number;

  constructor(
    imgEngineOff: HTMLImageElement,
    imgEngineOn: HTMLImageElement,
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number
  ) {
    this.imgEngineOff = imgEngineOff;
    this.imgEngineOn = imgEngineOn;
    this.img = imgEngineOff;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw(): void {
    this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
}
