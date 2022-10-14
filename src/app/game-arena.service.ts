import { Injectable } from '@angular/core';
import { Drawable } from './drawable';
import { figureCoordinates } from './figure-coordinates';
import { GameFigure } from './game-figure';
import { FigureType } from './game-images';
import { ShipFigure } from './ship-figure';
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
  private shipFigure: ShipFigure | undefined;
  private lastTimeCheckPoint = window.performance.now();

  private readonly INITIAL_ALTITUDE = 100;
  private readonly INITIAL_FUEL_AMOUNT = 100;
  private readonly SHIP_ACCELERATION = 3;
  private readonly SHIP_FUEL_CONSUMPTION = 1;

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
    const imageEngineOff = this.images.get(FigureType.shipEngineOff)!;
    const imageEngineOn = this.images.get(FigureType.shipEngineOn)!;
    this.shipFigure = new ShipFigure(
      imageEngineOff,
      imageEngineOn,
      this.ctx,
      180,
      100,
      50,
      scaleHeightForWidth(imageEngineOff, 50),
      this.INITIAL_ALTITUDE,
      this.INITIAL_FUEL_AMOUNT,
      this.SHIP_ACCELERATION,
      this.SHIP_FUEL_CONSUMPTION
    );
    this.drawableFigures.push(this.shipFigure);
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
    this.lastTimeCheckPoint = window.performance.now();
    const intervalId = window.setInterval(() => {
      const currentTime = window.performance.now();
      const time = currentTime - this.lastTimeCheckPoint;
      this.shipFigure?.move(time / 1000);
      this.drawFigures();
      this.showFuelAmount(this.shipFigure!.getFuelAmount());
      this.showAltitude(this.shipFigure!.getAltitude());
      this.showVelocity(this.shipFigure!.getVelocity());
      if (this.shipFigure!.isLanded()) {
        if (this.shipFigure!.isCrashed()) {
          window.setTimeout(() => {
            alert('Crashed!');
          }, 100);
        } else {
          window.setTimeout(() => {
            alert('Landed!');
          }, 100);
        }
        window.clearInterval(intervalId);
      }
      this.lastTimeCheckPoint = window.performance.now();
    }, 17);
  }

  turnOnEngine(): void {
    this.shipFigure?.turnOnEngine();
  }

  turnOffEngine(): void {
    this.shipFigure?.turnOffEngine();
  }
}
