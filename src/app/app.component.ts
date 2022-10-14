import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('canvasGame') canvasGame!: ElementRef<HTMLCanvasElement>;
  fuelAmount = 0;
  velocity = 0;

  ngOnInit(): void {}

  newGame(): void {}

  turnOnEngine(): void {}

  turnOffEngine(): void {}
}
