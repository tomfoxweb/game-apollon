import {
  NonPositiveAltitudeError,
  NonPositiveFuelAmountError,
} from './game-error';

export class Ship {
  private altitude: number;
  private fuelAmount: number;
  private velocity: number;
  private engineEnabled: boolean;
  private readonly MOON_GRAVITY = -1.62;
  private readonly SHIP_ACCELERATION = 3.0;
  private readonly FUEL_CONSUMPTION = 1.0;

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
    this.engineEnabled = false;
  }

  move(timeForMove: number): boolean {
    const acceleration = this.engineEnabled
      ? this.SHIP_ACCELERATION - this.MOON_GRAVITY
      : this.MOON_GRAVITY;
    this.altitude = this.calcAltitude(
      this.altitude,
      this.velocity,
      acceleration,
      timeForMove
    );
    this.velocity = this.calcVelocity(this.velocity, acceleration, timeForMove);
    this.fuelAmount = this.calcFuelConsumption(timeForMove);
    if (this.altitude < 0) {
      return false;
    }
    return true;
  }

  private calcVelocity(v0: number, a: number, t: number): number {
    return v0 + a * t;
  }

  private calcAltitude(h0: number, v0: number, a: number, t: number): number {
    return h0 + v0 * t + (a * t * t) / 2;
  }

  private calcFuelConsumption(timeForMove: number): number {
    if (!this.engineEnabled) {
      return this.fuelAmount;
    }
    let fuelAmount = this.fuelAmount - timeForMove * this.FUEL_CONSUMPTION;
    if (fuelAmount < 0) {
      fuelAmount = 0;
    }
    return fuelAmount;
  }

  turnOnEngine(): void {
    this.engineEnabled = true;
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
