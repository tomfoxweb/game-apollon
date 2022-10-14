import {
  NonPositiveAltitudeError,
  NonPositiveFuelAmountError,
  NonPositiveFuelConsumptionError,
} from './game-error';
import {
  calcAcceleration,
  calcAltitude,
  calcFuelConsumption,
  calcTimeBeforeLanding,
  calcVelocity,
  isSafeLandingVelocity,
  MOON_GRAVITY,
} from './physics';

export class Ship {
  private altitude: number;
  private fuelAmount: number;
  private velocity: number;
  private engineEnabled: boolean;
  private readonly engineAcceleration: number;
  private readonly fuelConsumption: number;
  private readonly maxSafeLandingVelocity: number;

  constructor(
    altitude: number,
    fuelAmount: number,
    engineAcceleration: number,
    fuelConsumption: number,
    maxSafeLandingVelocity: number
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
    this.maxSafeLandingVelocity = maxSafeLandingVelocity;
    this.velocity = 0;
    this.engineEnabled = false;
  }

  move(timeForMove: number): void {
    const acceleration = this.calculateAcceleration();
    const altitude = calcAltitude(
      this.altitude,
      this.velocity,
      acceleration,
      timeForMove
    );
    const timeForVelocity =
      altitude > 0
        ? timeForMove
        : calcTimeBeforeLanding(
            this.altitude,
            this.velocity,
            acceleration,
            timeForMove
          );
    this.altitude = altitude > 0 ? altitude : 0;
    this.velocity = calcVelocity(this.velocity, acceleration, timeForVelocity);
    this.fuelAmount = this.calculateFuelAmount(timeForMove);
    if (this.fuelAmount === 0) {
      this.turnOffEngine();
    }
  }

  private calculateAcceleration(): number {
    if (!this.engineEnabled) {
      return calcAcceleration(-MOON_GRAVITY);
    }
    return calcAcceleration(this.engineAcceleration, -MOON_GRAVITY);
  }

  private calculateFuelAmount(timeForMove: number): number {
    if (!this.engineEnabled) {
      return this.fuelAmount;
    }
    return calcFuelConsumption(
      this.fuelAmount,
      timeForMove,
      this.fuelConsumption
    );
  }

  turnOnEngine(): void {
    if (this.fuelAmount > 0) {
      this.engineEnabled = true;
    }
  }

  turnOffEngine(): void {
    this.engineEnabled = false;
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
    if (!this.isLanded()) {
      return false;
    }
    return !isSafeLandingVelocity(this.velocity, this.maxSafeLandingVelocity);
  }

  isLanded(): boolean {
    return this.altitude === 0;
  }

  isEngineEnabled(): boolean {
    return this.engineEnabled;
  }
}
