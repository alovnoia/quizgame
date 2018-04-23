import { TestBed, async, inject } from '@angular/core/testing';

import { PlayGuard } from './game.guard';

describe('PlayGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayGuard]
    });
  });

  it('should ...', inject([PlayGuard], (guard: PlayGuard) => {
    expect(guard).toBeTruthy();
  }));
});
