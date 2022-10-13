export const MOON_GRAVITY = 1.62;

export function calcVelocity(v0: number, a: number, t: number): number {
  return v0 + a * t;
}

export function calcAltitude(
  h0: number,
  v0: number,
  a: number,
  t: number
): number {
  return h0 + v0 * t + (a * t * t) / 2;
}

export function calcAcceleration(...accelerations: number[]): number {
  return accelerations.reduce((sum, current) => sum + current, 0);
}

export function calcFuelConsumption(
  fuelOnStart: number,
  time: number,
  consumptionOnTime: number
): number {
  if (fuelOnStart <= 0) {
    return 0;
  }
  let fuelAmount = fuelOnStart - time * consumptionOnTime;
  if (fuelAmount < 0) {
    fuelAmount = 0;
  }
  return fuelAmount;
}
