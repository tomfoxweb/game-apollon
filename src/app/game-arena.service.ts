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

  private initialAltitude = 100;
  private initialFuelAmount = 100;
  private safeLandingVelocity = 3;
  private shipAcceleration = 3;
  private SHIP_FUEL_CONSUMPTION = 1;

  private intervalId = 0;

  constructor() {}

  setViewProps(viewable: Viewable, canvas: HTMLCanvasElement): void {
    this.viewable = viewable;
    this.canvas = canvas;
    const ctx = this.canvas.getContext('2d');
    if (ctx === null) {
      throw new Error("Couldn't create canvas rendering 2d context");
    }
    this.ctx = ctx;
  }

  setImages(images: Map<FigureType, HTMLImageElement>): void {
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

  private createShipFigure(): void {
    const imageEngineOff = this.images!.get(FigureType.shipEngineOff)!;
    const imageEngineOn = this.images!.get(FigureType.shipEngineOn)!;
    const x = 170;
    const w = 30;
    const h = scaleHeightForWidth(imageEngineOff, w);
    const y = this.initialAltitude - (500 - 25 - h);
    this.shipFigure = new ShipFigure(
      imageEngineOff,
      imageEngineOn,
      this.ctx!,
      x,
      y,
      w,
      h,
      this.initialAltitude,
      this.initialFuelAmount,
      this.shipAcceleration,
      this.SHIP_FUEL_CONSUMPTION,
      this.safeLandingVelocity
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

  showLoadingMessage(): void {
    this.ctx!.save();
    this.ctx!.font = '36px monospace';
    this.ctx!.fillStyle = 'white';
    this.ctx!.fillText('Loading...', 95, 250);
    this.ctx!.restore();
  }

  showIntroFigures(): void {
    this.createGameFigures();
    this.drawFigures();
  }

  newGame(
    altitude: number,
    fuelAmount: number,
    acceleration: number,
    safeVelocity: number
  ): void {
    this.initialAltitude = altitude;
    this.initialFuelAmount = fuelAmount;
    this.shipAcceleration = acceleration;
    this.safeLandingVelocity = safeVelocity;
    this.createGameFigures();
    this.createShipFigure();
    this.lastTimeCheckPoint = window.performance.now();
    this.intervalId = window.setInterval(() => {
      const currentTime = window.performance.now();
      const time = currentTime - this.lastTimeCheckPoint;
      this.shipFigure?.move(time / 1000);
      this.drawFigures();
      this.showFuelAmount(this.shipFigure!.getFuelAmount());
      this.showAltitude(this.shipFigure!.getAltitude());
      this.showVelocity(this.shipFigure!.getVelocity());
      if (this.shipFigure!.isLanded()) {
        this.shipFigure?.turnOffEngine();
        window.clearInterval(this.intervalId);
        this.viewable?.finishGame();
        if (this.shipFigure!.isCrashed()) {
          this.showFailLandingMessage();
        } else {
          this.showSuccessLandingMessage();
        }
      }
      this.lastTimeCheckPoint = window.performance.now();
    }, 17);
  }

  private showFailLandingMessage(): void {
    this.ctx!.save();
    this.ctx!.font = '36px monospace';
    this.ctx!.fillStyle = 'orange';
    this.ctx!.fillText('Fail!', 140, 250);
    this.ctx!.restore();
  }

  private showSuccessLandingMessage(): void {
    this.ctx!.save();
    this.ctx!.font = '36px monospace';
    this.ctx!.fillStyle = 'gold';
    this.ctx!.fillText('Success!', 110, 250);
    this.ctx!.restore();
  }

  turnOnEngine(): void {
    this.shipFigure?.turnOnEngine();
  }

  turnOffEngine(): void {
    this.shipFigure?.turnOffEngine();
  }
}
