import { TestBed, inject } from '@angular/core/testing';

import { TeamsEffects } from './teams-effects.service';

describe('TeamsEffects', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamsEffects]
    });
  });

  it('should be created', inject([TeamsEffects], (service: TeamsEffects) => {
    expect(service).toBeTruthy();
  }));
});
