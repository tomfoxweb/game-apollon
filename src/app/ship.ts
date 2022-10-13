import {
  NonPositiveAltitudeError,
  NonPositiveFuelAmountError,
} from './game-error';

export class Ship {
  constructor(altitude: number, fuelAmount: number) {
    if (altitude <= 0) {
      throw new NonPositiveAltitudeError();
    }
    if (fuelAmount <= 0) {
      throw new NonPositiveFuelAmountError();
    }
  }
}
