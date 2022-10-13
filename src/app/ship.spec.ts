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
import { Ship } from './ship';

describe('Ship constructor throw Errors', () => {
  it('should throw NonPositiveAltitudeError if altitude < 0', () => {
    expect(function () {
      const ship = new Ship(-100, 2000, 3, 1);
    }).toThrowError(NonPositiveAltitudeError);
  });

  it('should throw NonPositiveAltitudeError if altitude === 0', () => {
    expect(function () {
      const ship = new Ship(0, 2000, 3, 1);
    }).toThrowError(NonPositiveAltitudeError);
  });

  it('should throw NonPositiveFuelAmountError if fuelAmount < 0', () => {
    expect(function () {
      const ship = new Ship(50, -70, 3, 2);
    }).toThrowError(NonPositiveFuelAmountError);
  });

  it('should throw NonPositiveFuelAmountError if fuelAmount === 0', () => {
    expect(function () {
      const ship = new Ship(50, 0, 3, 4);
    }).toThrowError(NonPositiveFuelAmountError);
  });

  it('should throw NonPositiveAltitudeError if all params negative', () => {
    expect(function () {
      const ship = new Ship(-80, -90, -3, -5);
    }).toThrowError(NonPositiveAltitudeError);
  });

  it('should throw NonPositiveAltitudeError if all params zero', () => {
    expect(function () {
      const ship = new Ship(0, 0, 0, 0);
    }).toThrowError(NonPositiveAltitudeError);
  });

  it('should throw NonPositiveFuelConsumptionError', () => {
    expect(function () {
      const ship = new Ship(10, 2, 1, -2);
    }).toThrowError(NonPositiveFuelConsumptionError);
  });
});

describe('Ship constructor init properties', () => {
  let ship: Ship;
  const startAltitude = 10;
  const startFuelAmount = 5;
  const engineAcceleration = 3;
  const fuelConsumption = 1;

  beforeEach(() => {
    ship = new Ship(
      startAltitude,
      startFuelAmount,
      engineAcceleration,
      fuelConsumption
    );
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

  it('should not landed on start', () => {
    expect(ship.isLanded()).toBeFalse();
  });
});

describe('Ship move', () => {
  let ship: Ship;
  const startAltitude = 10;
  const startFuelAmount = 5;
  const engineAcceleration = 3;
  const fuelConsumption = 1.0;

  describe('move down 1 second', () => {
    const timeForMove = 1.0;

    beforeEach(() => {
      ship = new Ship(
        startAltitude,
        startFuelAmount,
        engineAcceleration,
        fuelConsumption
      );
      ship.move(timeForMove);
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

    it('should not landed', () => {
      expect(ship.isLanded()).toBeFalse();
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

    beforeEach(() => {
      ship = new Ship(
        startAltitude,
        startFuelAmount,
        engineAcceleration,
        fuelConsumption
      );
      ship.move(timeWithoutEngine);
      ship.turnOnEngine();
      ship.move(timeWithEngine);
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
        calcAcceleration(engineAcceleration, -MOON_GRAVITY),
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
        calcAcceleration(engineAcceleration, -MOON_GRAVITY),
        timeWithEngine
      );
      const actualVelocity = ship.getVelocity();
      expect(actualVelocity).toBeCloseTo(expectedVelocity, 3);
    });

    it('should consumpt 1 amount of fuel', () => {
      const expectedFuelAmount = calcFuelConsumption(
        startFuelAmount,
        timeWithEngine,
        fuelConsumption
      );
      const actualFuelAmount = ship.getFuelAmount();
      expect(actualFuelAmount).toBeCloseTo(expectedFuelAmount, 3);
    });

    it('should not crash', () => {
      expect(ship.isCrashed()).toBeFalse();
    });

    it('should not landed', () => {
      expect(ship.isLanded()).toBeFalse();
    });
  });

  describe('move down for 4 seconds without engine', () => {
    const timeWithoutEngine = 4.0;

    beforeEach(() => {
      ship = new Ship(
        startAltitude,
        startFuelAmount,
        engineAcceleration,
        fuelConsumption
      );
      ship.move(timeWithoutEngine);
    });

    it('should crash', () => {
      expect(ship.isCrashed()).toBeTrue();
    });

    it('should be landed', () => {
      expect(ship.isLanded()).toBeTrue();
    });

    it('should correctly calculate velocity', () => {
      const expectedVelocity = calcVelocity(
        0,
        calcAcceleration(-MOON_GRAVITY),
        timeWithoutEngine
      );
      const actualVelocity = ship.getVelocity();
      expect(actualVelocity).toBeCloseTo(expectedVelocity, 3);
    });

    it('should calculate correct altitude', () => {
      const expectedAltitude = 0;
      const actualAltitude = ship.getAltitude();
      expect(actualAltitude).toBeCloseTo(expectedAltitude, 3);
    });

    it('should not consumpt fuel', () => {
      const expectedFuelAmount = startFuelAmount;
      const actualFuelAmount = ship.getFuelAmount();
      expect(actualFuelAmount).toBeCloseTo(expectedFuelAmount, 3);
    });
  });

  describe('move and consumpt all fuel', () => {
    const timeWithEngine = 5.0;
    const timeWithoutEngine = 20.0;

    beforeEach(() => {
      ship = new Ship(
        startAltitude,
        startFuelAmount,
        engineAcceleration,
        fuelConsumption
      );
      ship.turnOnEngine();
      ship.move(timeWithEngine);
      ship.move(timeWithoutEngine);
    });

    it('should crash', () => {
      expect(ship.isCrashed()).toBeTrue();
    });

    it('should be landed', () => {
      expect(ship.isLanded()).toBeTrue();
    });

    it('should consumpt all amount of fuel', () => {
      const expectedFuelAmount = calcFuelConsumption(
        startFuelAmount,
        timeWithEngine,
        fuelConsumption
      );
      const actualFuelAmount = ship.getFuelAmount();
      expect(actualFuelAmount).toBeCloseTo(expectedFuelAmount, 3);
    });

    it('should correctly calculate velocity', () => {
      const withEnginVelocity = calcVelocity(
        0,
        calcAcceleration(engineAcceleration, -MOON_GRAVITY),
        timeWithEngine
      );
      const expectedVelocity = calcVelocity(
        withEnginVelocity,
        calcAcceleration(-MOON_GRAVITY),
        timeWithoutEngine
      );
      const actualVelocity = ship.getVelocity();
      expect(actualVelocity).toBeCloseTo(expectedVelocity, 3);
    });

    it('should calculate correct altitude', () => {
      const expectedAltitude = 0;
      const actualAltitude = ship.getAltitude();
      expect(actualAltitude).toBeCloseTo(expectedAltitude, 3);
    });
  });
});
