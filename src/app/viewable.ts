export interface Viewable {
  showFuelAmount(fuelAmount: number): void;
  showAltitude(altitude: number): void;
  showVelocity(velocity: number): void;
  finishGame(): void;
}
