import {
  NonPositiveAltitudeError,
  NonPositiveFuelAmountError,
} from './game-error';
import {
  calcAcceleration,
  calcAltitude,
  calcFuelConsumption,
  calcVelocity,
  MOON_GRAVITY,
} from './physics';
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

describe('Ship move', () => {
  let ship: Ship;
  const startAltitude = 10;
  const startFuelAmount = 5;
  const SHIP_ACCELERATION = 3;
  const FUEL_CONSUMPTION = 1.0;

  describe('move down 1 second', () => {
    const timeForMove = 1.0;
    let isMoved = false;

    beforeEach(() => {
      ship = new Ship(startAltitude, startFuelAmount);
      isMoved = ship.move(timeForMove);
    });

    it('should move', () => {
      expect(isMoved).toBeTrue();
    });

    it('should calculate correct altitude', () => {
      const expectedAltitude = calcAltitude(
        startAltitude,
        0,
        -MOON_GRAVITY,
        timeForMove
      );
      const actualAltitude = ship.getAltitude();
      expect(actualAltitude).toBeCloseTo(expectedAltitude, 3);
    });

    it('should not crash', () => {
      expect(ship.isCrashed()).toBeFalse();
    });

    it('should not consumpt fuel', () => {
      const expectedFuelAmount = startFuelAmount;
      const actualFuelAmount = ship.getFuelAmount();
      expect(actualFuelAmount).toBeCloseTo(expectedFuelAmount, 3);
    });

    it('should calculate correct velocity', () => {
      const expectedVelocity = calcVelocity(0, -MOON_GRAVITY, timeForMove);
      const actualVelocity = ship.getVelocity();
      expect(actualVelocity).toBeCloseTo(expectedVelocity, 3);
    });
  });

  describe('move down for 1 second then enable engine for 1 second', () => {
    const timeWithoutEngine = 1.0;
    const timeWithEngine = 1.0;
    let isMoved = false;

    beforeEach(() => {
      ship = new Ship(startAltitude, startFuelAmount);
      ship.move(timeWithoutEngine);
      ship.turnOnEngine();
      isMoved = ship.move(timeWithEngine);
    });

    it('should move', () => {
      expect(isMoved).toBeTrue();
    });

    it('should calculate correct altitude', () => {
      const withoutEngineAltitude = calcAltitude(
        startAltitude,
        0,
        calcAcceleration(-MOON_GRAVITY),
        timeWithoutEngine
      );
      const withoutEngineVelocity = calcVelocity(
        0,
        calcAcceleration(-MOON_GRAVITY),
        timeWithoutEngine
      );
      const expectedAltitude = calcAltitude(
        withoutEngineAltitude,
        withoutEngineVelocity,
        calcAcceleration(SHIP_ACCELERATION, -MOON_GRAVITY),
        timeWithEngine
      );
      const actualAltitude = ship.getAltitude();
      expect(actualAltitude).toBeCloseTo(expectedAltitude, 3);
    });

    it('should calculate correct velocity', () => {
      const withoutEngineVelocity = calcVelocity(
        0,
        calcAcceleration(-MOON_GRAVITY),
        timeWithoutEngine
      );
      const expectedVelocity = calcVelocity(
        withoutEngineVelocity,
        calcAcceleration(SHIP_ACCELERATION, -MOON_GRAVITY),
        timeWithEngine
      );
      const actualVelocity = ship.getVelocity();
      expect(actualVelocity).toBeCloseTo(expectedVelocity, 3);
    });

    it('should consumpt 1 amount of fuel', () => {
      const expectedFuelAmount = calcFuelConsumption(
        startFuelAmount,
        timeWithEngine,
        FUEL_CONSUMPTION
      );
      const actualFuelAmount = ship.getFuelAmount();
      expect(actualFuelAmount).toBeCloseTo(expectedFuelAmount, 3);
    });

    it('should not crash', () => {
      expect(ship.isCrashed()).toBeFalse();
    });
  });
});
