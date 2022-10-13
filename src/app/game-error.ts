export class GameError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class NonPositiveAltitudeError extends GameError {
  constructor() {
    super('Altitude must be positive');
  }
}

export class NonPositiveFuelAmountError extends GameError {
  constructor() {
    super('Fuel amount must be positive');
  }
}

export class NonPositiveFuelConsumptionError extends GameError {
  constructor() {
    super('Fuel consumption amount must be positive');
  }
}
