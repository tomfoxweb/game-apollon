import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GameArenaService } from './game-arena.service';
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

  constructor(private gameArena: GameArenaService) {}

  ngAfterViewInit(): void {
    this.gameArena.setViewable(this, this.canvasGame.nativeElement);
  }

  ngOnInit(): void {}

  showFuelAmount(fuelAmount: number): void {
    this.fuelAmount = fuelAmount;
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
