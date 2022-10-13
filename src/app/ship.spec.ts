import {
  NonPositiveAltitudeError,
  NonPositiveFuelAmountError,
} from './game-error';
import { Ship } from './ship';

describe('Ship constructor throw Errors', () => {
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

  it('should set altitude and fuelAmount', () => {
    const altitude = 100;
    const fuelAmount = 700;
    const ship = new Ship(altitude, fuelAmount);
    expect(ship.getAltitude()).toBe(altitude);
    expect(ship.getFuelAmount()).toBe(fuelAmount);
  });

  it('should set zero velocity on start', () => {
    const altitude = 100;
    const fuelAmount = 700;
    const ship = new Ship(altitude, fuelAmount);
    expect(ship.getVelocity()).toBe(0);
  });

  it('should not crash on start', () => {
    const altitude = 100;
    const fuelAmount = 700;
    const ship = new Ship(altitude, fuelAmount);
    expect(ship.getVelocity()).toBe(0);
  });
});

describe('Ship constructor init properties', () => {
  let ship: Ship;
  const startAltitude = 10;
  const startFuelAmount = 5;

  beforeEach(() => {
    ship = new Ship(startAltitude, startFuelAmount);
  });

  it('should set altitude and fuelAmount', () => {
    expect(ship.getAltitude()).toBe(startAltitude);
    expect(ship.getFuelAmount()).toBe(startFuelAmount);
  });

  it('should set zero velocity on start', () => {
    expect(ship.getVelocity()).toBe(0);
  });

  it('should not crash on start', () => {
    expect(ship.isCrashed()).toBeFalse();
  });
});
