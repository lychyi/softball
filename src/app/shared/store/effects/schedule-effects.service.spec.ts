import { TestBed, inject } from '@angular/core/testing';

import { ScheduleEffectsService } from './schedule-effects.service';

describe('ScheduleEffectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScheduleEffectsService]
    });
  });

  it('should be created', inject([ScheduleEffectsService], (service: ScheduleEffectsService) => {
    expect(service).toBeTruthy();
  }));
});
