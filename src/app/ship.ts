import {
  NonPositiveAltitudeError,
  NonPositiveFuelAmountError,
  NonPositiveFuelConsumptionError,
} from './game-error';
import {
  calcAcceleration,
  calcAltitude,
  calcFuelConsumption,
  calcVelocity,
  MOON_GRAVITY,
} from './physics';

export class Ship {
  private altitude: number;
  private fuelAmount: number;
  private velocity: number;
  private engineEnabled: boolean;
  private readonly engineAcceleration: number;
  private readonly fuelConsumption: number;

  constructor(
    altitude: number,
    fuelAmount: number,
    engineAcceleration: number,
    fuelConsumption: number
  ) {
    if (altitude <= 0) {
      throw new NonPositiveAltitudeError();
    }
    if (fuelAmount <= 0) {
      throw new NonPositiveFuelAmountError();
    }
    if (fuelConsumption <= 0) {
      throw new NonPositiveFuelConsumptionError();
    }
    this.altitude = altitude;
    this.fuelAmount = fuelAmount;
    this.engineAcceleration = engineAcceleration;
    this.fuelConsumption = fuelConsumption;
    this.velocity = 0;
    this.engineEnabled = false;
  }

  move(timeForMove: number): boolean {
    const acceleration = this.engineEnabled
      ? calcAcceleration(this.engineAcceleration, -MOON_GRAVITY)
      : calcAcceleration(-MOON_GRAVITY);
    this.altitude = calcAltitude(
      this.altitude,
      this.velocity,
      acceleration,
      timeForMove
    );
    this.velocity = calcVelocity(this.velocity, acceleration, timeForMove);
    if (this.engineEnabled) {
      this.fuelAmount = calcFuelConsumption(
        this.fuelAmount,
        timeForMove,
        this.fuelConsumption
      );
    }
    if (this.altitude < 0) {
      return false;
    }
    return true;
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
