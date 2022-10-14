import { Injectable } from '@angular/core';
import { Drawable } from './drawable';
import { figureCoordinates } from './figure-coordinates';
import { GameFigure } from './game-figure';
import { FigureType } from './game-images';
import { Viewable } from './viewable';

function scaleHeightForWidth(image: HTMLImageElement, width: number): number {
  return (width / image.width) * image.height;
}

@Injectable({
  providedIn: 'root',
})
export class GameArenaService {
  private viewable: Viewable | undefined;
  private canvas: HTMLCanvasElement | undefined;
  private ctx: CanvasRenderingContext2D | undefined;
  private images: Map<FigureType, HTMLImageElement> | undefined;
  private drawableFigures: Drawable[] = [];

  private readonly INITIAL_FUEL_AMOUNT = 100;
  private readonly INITIAL_HEIGHT = 300;

  constructor() {}

  setViewProps(
    viewable: Viewable,
    canvas: HTMLCanvasElement,
    images: Map<FigureType, HTMLImageElement>
  ): void {
    this.viewable = viewable;
    this.canvas = canvas;
    const ctx = this.canvas.getContext('2d');
    if (ctx === null) {
      throw new Error("Couldn't create canvas rendering 2d context");
    }
    this.ctx = ctx;
    this.images = images;
  }

  private createGameFigures(): void {
    this.drawableFigures = [];
    if (this.images === undefined) {
      throw new Error('Undefined images in GameArenaService');
    }
    if (this.ctx === undefined) {
      throw new Error('Undefined rendering context in GameArenaService');
    }
    for (const c of figureCoordinates) {
      const image = this.images.get(c.figureType)!;
      const figure = new GameFigure(
        image,
        this.ctx,
        c.x,
        c.y,
        c.width,
        scaleHeightForWidth(image, c.width)
      );
      this.drawableFigures.push(figure);
    }
  }

  private drawFigures(): void {
    this.ctx!.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
    for (const figure of this.drawableFigures) {
      figure.draw();
    }
  }

  private showFuelAmount(fuelAmount: number): void {
    if (this.viewable === undefined) {
      throw new Error('Undefined View on GameArenaService');
    }
    this.viewable.showFuelAmount(fuelAmount);
  }

  private showVelocity(velocity: number): void {
    if (this.viewable === undefined) {
      throw new Error('Undefined View on GameArenaService');
    }
    this.viewable.showVelocity(velocity);
  }

  private showAltitude(altitude: number): void {
    if (this.viewable === undefined) {
      throw new Error('Undefined View on GameArenaService');
    }
    this.viewable.showAltitude(altitude);
  }

  newGame(): void {
    this.createGameFigures();
    this.drawFigures();
  }

  turnOnEngine(): void {}

  turnOffEngine(): void {}
}
