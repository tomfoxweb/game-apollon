import {
  NonPositiveAltitudeError,
  NonPositiveFuelAmountError,
} from './game-error';
import { Ship } from './ship';

describe('Ship constructor', () => {
  it('should accept positive altitude and fuelAmount params', () => {
    expect(() => {
      const ship = new Ship(100, 1000);
    }).not.toThrow();
  });

  it('should throw NonPositiveAltitudeError if altitude < 0', () => {
    expect(function () {
      const ship = new Ship(-100, 2000);
    }).toThrowError(NonPositiveAltitudeError);
  });

  it('should throw NonPositiveAltitudeError if altitude === 0', () => {
    expect(function () {
      const ship = new Ship(0, 2000);
    }).toThrowError(NonPositiveAltitudeError);
  });

  it('should throw NonPositiveFuelAmountError if fuelAmount < 0', () => {
    expect(function () {
      const ship = new Ship(50, -70);
    }).toThrowError(NonPositiveFuelAmountError);
  });

  it('should throw NonPositiveFuelAmountError if fuelAmount === 0', () => {
    expect(function () {
      const ship = new Ship(50, 0);
    }).toThrowError(NonPositiveFuelAmountError);
  });

  it('should throw NonPositiveAltitudeError if both params negative', () => {
    expect(function () {
      const ship = new Ship(-80, -90);
    }).toThrowError(NonPositiveAltitudeError);
  });

  it('should throw NonPositiveAltitudeError if both params zero', () => {
    expect(function () {
      const ship = new Ship(0, 0);
    }).toThrowError(NonPositiveAltitudeError);
  });
});
