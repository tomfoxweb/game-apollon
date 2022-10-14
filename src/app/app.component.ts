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
  fuelAmount = 0;
  velocity = 0;
  altitude = 0;

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
    this.gameArena.newGame();
  }

  turnOnEngine(): void {
    this.gameArena.turnOnEngine();
  }

  turnOffEngine(): void {
    this.gameArena.turnOffEngine();
  }
}
