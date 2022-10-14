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
  MOON_GRAVITY,
} from './physics';
import { Ship } from './ship';

describe('Ship constructor throw Errors', () => {
  it('should throw NonPositiveAltitudeError if altitude < 0', () => {
    expect(function () {
      const ship = new Ship(-100, 2000, 3, 1, 1);
    }).toThrowError(NonPositiveAltitudeError);
  });

  it('should throw NonPositiveAltitudeError if altitude === 0', () => {
    expect(function () {
      const ship = new Ship(0, 2000, 3, 1, 1);
    }).toThrowError(NonPositiveAltitudeError);
  });

  it('should throw NonPositiveFuelAmountError if fuelAmount < 0', () => {
    expect(function () {
      const ship = new Ship(50, -70, 3, 2, 1);
    }).toThrowError(NonPositiveFuelAmountError);
  });

  it('should throw NonPositiveFuelAmountError if fuelAmount === 0', () => {
    expect(function () {
      const ship = new Ship(50, 0, 3, 4, 1);
    }).toThrowError(NonPositiveFuelAmountError);
  });

  it('should throw NonPositiveAltitudeError if all params negative', () => {
    expect(function () {
      const ship = new Ship(-80, -90, -3, -5, 1);
    }).toThrowError(NonPositiveAltitudeError);
  });

  it('should throw NonPositiveAltitudeError if all params zero', () => {
    expect(function () {
      const ship = new Ship(0, 0, 0, 0, 1);
    }).toThrowError(NonPositiveAltitudeError);
  });

  it('should throw NonPositiveFuelConsumptionError', () => {
    expect(function () {
      const ship = new Ship(10, 2, 1, -2, 1);
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
      fuelConsumption,
      1
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
        fuelConsumption,
        1
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
      const expectedVelocity = -1.62;
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
        fuelConsumption,
        1
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
      const expectedVelocity = -0.24;
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
        fuelConsumption,
        1
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
      const expectedVelocity = -5.692;
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
        fuelConsumption,
        1
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
      expect(actualFuelAmount).toBeCloseTo(expectedFuelAmount, 2);
    });

    it('should correctly calculate velocity', () => {
      const expectedVelocity = -11.657;
      const actualVelocity = ship.getVelocity();
      expect(actualVelocity).toBeCloseTo(expectedVelocity, 2);
    });

    it('should calculate correct altitude', () => {
      const expectedAltitude = 0;
      const actualAltitude = ship.getAltitude();
      expect(actualAltitude).toBeCloseTo(expectedAltitude, 2);
    });
  });
});

describe('Successfully landing after free fall', () => {
  let ship: Ship;
  const startAltitude = 0.29;
  const startFuelAmount = 100;
  const engineAcceleration = 3;
  const fuelConsumption = 1.0;

  describe('move down 0.6 second', () => {
    const timeForMove = 0.6;

    beforeEach(() => {
      ship = new Ship(
        startAltitude,
        startFuelAmount,
        engineAcceleration,
        fuelConsumption,
        1
      );
      ship.move(timeForMove);
    });

    it('should calculate correct altitude', () => {
      const expectedAltitude = 0;
      const actualAltitude = ship.getAltitude();
      expect(actualAltitude).toBeCloseTo(expectedAltitude, 3);
    });

    it('should not crash', () => {
      expect(ship.isCrashed()).toBeFalse();
    });

    it('should landed', () => {
      expect(ship.isLanded()).toBeTrue();
    });

    it('should not consumpt fuel', () => {
      const expectedFuelAmount = startFuelAmount;
      const actualFuelAmount = ship.getFuelAmount();
      expect(actualFuelAmount).toBeCloseTo(expectedFuelAmount, 3);
    });

    it('should calculate correct velocity', () => {
      const expectedVelocity = calcVelocity(0, -MOON_GRAVITY, timeForMove);
      const actualVelocity = ship.getVelocity();
      expect(actualVelocity).toBeCloseTo(expectedVelocity, 1);
    });
  });

  describe('move down 1 second', () => {
    const timeForMove = 1;

    beforeEach(() => {
      ship = new Ship(
        startAltitude,
        startFuelAmount,
        engineAcceleration,
        fuelConsumption,
        1
      );
      ship.move(timeForMove);
    });

    it('should calculate correct altitude', () => {
      const expectedAltitude = 0;
      const actualAltitude = ship.getAltitude();
      expect(actualAltitude).toBeCloseTo(expectedAltitude, 3);
    });

    it('should not crash', () => {
      expect(ship.isCrashed()).toBeFalse();
    });

    it('should landed', () => {
      expect(ship.isLanded()).toBeTrue();
    });

    it('should not consumpt fuel', () => {
      const expectedFuelAmount = startFuelAmount;
      const actualFuelAmount = ship.getFuelAmount();
      expect(actualFuelAmount).toBeCloseTo(expectedFuelAmount, 3);
    });

    it('should calculate correct velocity', () => {
      const timeBeforeLanding = calcTimeBeforeLanding(
        startAltitude,
        0,
        -MOON_GRAVITY,
        timeForMove
      );
      const expectedVelocity = timeBeforeLanding * -MOON_GRAVITY;
      const actualVelocity = ship.getVelocity();
      expect(actualVelocity).toBeCloseTo(expectedVelocity, 1);
    });
  });

  describe('move down 0.2s up 0.1s down 1s', () => {
    const time1down = 0.2;
    const time2up = 0.1;
    const time3down = 1.0;

    beforeEach(() => {
      ship = new Ship(
        startAltitude,
        startFuelAmount,
        engineAcceleration,
        fuelConsumption,
        1
      );
      ship.move(time1down);
      ship.turnOnEngine();
      ship.move(time2up);
      ship.turnOffEngine();
      ship.move(time3down);
    });

    it('should not crash', () => {
      expect(ship.isCrashed()).toBeFalse();
    });

    it('should be landed', () => {
      expect(ship.isLanded()).toBeTrue();
    });

    it('should consumpt some amount of fuel', () => {
      const expectedFuelAmount = calcFuelConsumption(
        startFuelAmount,
        time2up,
        fuelConsumption
      );
      const actualFuelAmount = ship.getFuelAmount();
      expect(actualFuelAmount).toBeCloseTo(expectedFuelAmount, 2);
    });

    it('should correctly calculate velocity', () => {
      const velocityDown1 = calcVelocity(0, -MOON_GRAVITY, time1down);
      const altitudeDown1 = calcAltitude(
        startAltitude,
        0,
        -MOON_GRAVITY,
        time1down
      );
      const altitudeUp2 = calcAltitude(
        altitudeDown1,
        velocityDown1,
        calcAcceleration(engineAcceleration, -MOON_GRAVITY),
        time2up
      );
      const timeBeforeLanding = calcTimeBeforeLanding(
        altitudeUp2,
        0,
        -MOON_GRAVITY,
        time3down
      );
      const expectedVelocity = timeBeforeLanding * -MOON_GRAVITY;
      const actualVelocity = ship.getVelocity();
      expect(actualVelocity).toBeCloseTo(expectedVelocity, 1);
    });

    it('should calculate correct altitude', () => {
      const expectedAltitude = 0;
      const actualAltitude = ship.getAltitude();
      expect(actualAltitude).toBeCloseTo(expectedAltitude, 2);
    });
  });
});
