import {
  NonPositiveAltitudeError,
  NonPositiveFuelAmountError,
} from './game-error';

export class Ship {
  private altitude: number;
  private fuelAmount: number;
  private velocity: number;

  constructor(altitude: number, fuelAmount: number) {
    if (altitude <= 0) {
      throw new NonPositiveAltitudeError();
    }
    if (fuelAmount <= 0) {
      throw new NonPositiveFuelAmountError();
    }
    this.altitude = altitude;
    this.fuelAmount = fuelAmount;
    this.velocity = 0;
  }

  getAltitude(): number {
    return this.altitude;
  }

  getFuelAmount(): number {
    return this.fuelAmount;
  }

  getVelocity(): number {
    return this.velocity;
  }

  isCrashed(): boolean {
    return false;
  }
}
