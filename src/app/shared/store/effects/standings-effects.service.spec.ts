import { TestBed, inject } from '@angular/core/testing';

import { StandingsEffectsService } from './standings-effects.service';

describe('StandingsEffectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StandingsEffectsService]
    });
  });

  it('should be created', inject([StandingsEffectsService], (service: StandingsEffectsService) => {
    expect(service).toBeTruthy();
  }));
});
