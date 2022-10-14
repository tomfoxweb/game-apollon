import { Injectable } from '@angular/core';
import { Viewable } from './viewable';

@Injectable({
  providedIn: 'root',
})
export class GameArenaService {
  private viewable: Viewable | undefined;
  private canvas: HTMLCanvasElement | undefined;

  private readonly INITIAL_FUEL_AMOUNT = 100;
  private readonly INITIAL_HEIGHT = 300;

  constructor() {}

  setViewable(viewable: Viewable, canvas: HTMLCanvasElement): void {
    this.viewable = viewable;
    this.canvas = canvas;
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

  newGame(): void {}

  turnOnEngine(): void {}

  turnOffEngine(): void {}
}
