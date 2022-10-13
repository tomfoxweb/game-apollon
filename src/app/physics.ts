export const MOON_GRAVITY = 1.62;
export const MAX_SAFE_LANDING_VELOCITY = 1.0;

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

export function calcTimeBeforeLanding(
  h0: number,
  v0: number,
  a: number,
  t: number
): number {
  const [x1, x2] = solveQuadraticEquation(a / 2, v0, h0);
  if (x1 > 0) {
    return x1;
  } else if (x2 > 0) {
    return x2;
  }
  throw new Error('Irrational solve');
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

export function isSafeLandingVelocity(velocity: number): boolean {
  return Math.abs(velocity) <= MAX_SAFE_LANDING_VELOCITY;
}

export function solveQuadraticEquation(
  a: number,
  b: number,
  c: number
): [number, number] {
  const D = b * b - 4 * a * c;
  if (D < 0) {
    throw new Error('Irrational');
  }
  const sqrtOfD = Math.sqrt(D);
  const x1 = (-b - sqrtOfD) / (2 * a);
  const x2 = (-b + sqrtOfD) / (2 * a);

  return [x1, x2];
}
