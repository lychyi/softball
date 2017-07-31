import { TestBed, inject } from '@angular/core/testing';

import { TeamsSandboxService } from './teams-sandbox.service';

describe('TeamsSandboxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamsSandboxService]
    });
  });

  it('should be created', inject([TeamsSandboxService], (service: TeamsSandboxService) => {
    expect(service).toBeTruthy();
  }));
});
