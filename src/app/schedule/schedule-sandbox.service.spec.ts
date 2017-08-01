import { TestBed, inject } from '@angular/core/testing';

import { ScheduleSandboxService } from './schedule-sandbox.service';

describe('ScheduleSandboxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScheduleSandboxService]
    });
  });

  it('should be created', inject([ScheduleSandboxService], (service: ScheduleSandboxService) => {
    expect(service).toBeTruthy();
  }));
});
