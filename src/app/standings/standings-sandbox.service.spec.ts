import { TestBed, inject } from '@angular/core/testing';

import { StandingsSandboxService } from './standings-sandbox.service';

describe('StandingsSandboxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StandingsSandboxService]
    });
  });

  it('should be created', inject([StandingsSandboxService], (service: StandingsSandboxService) => {
    expect(service).toBeTruthy();
  }));
});
