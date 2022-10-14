import { TestBed } from '@angular/core/testing';

import { GameArenaService } from './game-arena.service';

describe('GameArenaService', () => {
  let service: GameArenaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameArenaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
