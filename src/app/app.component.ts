import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GameArenaService } from './game-arena.service';
import { FigureType } from './game-images';
import { ImageProviderService } from './image-provider.service';
import { Viewable } from './viewable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, Viewable {
  @ViewChild('canvasGame') canvasGame!: ElementRef<HTMLCanvasElement>;
  @ViewChild('rangeAltitude') rangeAltitude!: ElementRef<HTMLInputElement>;
  @ViewChild('rangeFuelAmount') rangeFuelAmount!: ElementRef<HTMLInputElement>;
  @ViewChild('rangeAcceleration')
  rangeAcceleration!: ElementRef<HTMLInputElement>;
  @ViewChild('rangeSafeVelocity')
  rangeSafeVelocity!: ElementRef<HTMLInputElement>;
  minAltitude = 10;
  maxAltitude = 500;
  valueAltitude = 500;
  minFuelAmount = 10;
  maxFuelAmount = 100;
  valueFuelAmount = 50;
  minShipAcceleration = 2.0;
  maxShipAcceleration = 10.0;
  valueShipAcceleration = 5.0;
  minSafeVelocity = 1.0;
  maxSafeVelocity = 5.0;
  valueSafeVelocity = 3.0;
  fuelAmount = this.valueFuelAmount;
  velocity = 0;
  altitude = this.valueAltitude;

  private images: Promise<Map<FigureType, HTMLImageElement>> | undefined;

  constructor(
    private gameArena: GameArenaService,
    private imageProvider: ImageProviderService
  ) {}

  ngAfterViewInit(): void {
    this.images?.then((images) => {
      this.gameArena.setViewProps(this, this.canvasGame.nativeElement, images);
    });
  }

  ngOnInit(): void {
    this.images = this.imageProvider.loadImages();
  }

  showFuelAmount(fuelAmount: number): void {
    this.fuelAmount = fuelAmount;
  }

  showAltitude(altitude: number): void {
    this.altitude = altitude;
  }

  showVelocity(velocity: number): void {
    this.velocity = velocity;
  }

  newGame(): void {
    const altitude = Number(this.rangeAltitude.nativeElement.value);
    const fuel = Number(this.rangeFuelAmount.nativeElement.value);
    const acceleration = Number(this.rangeAcceleration.nativeElement.value);
    const velocity = Number(this.rangeSafeVelocity.nativeElement.value);
    this.gameArena.newGame(altitude, fuel, acceleration, velocity);
  }

  turnOnEngine(): void {
    this.gameArena.turnOnEngine();
  }

  turnOffEngine(): void {
    this.gameArena.turnOffEngine();
  }
}
