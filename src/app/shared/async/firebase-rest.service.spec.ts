import { TestBed, inject } from '@angular/core/testing';

import { FirebaseRestService } from './firebase-rest.service';

describe('FirebaseRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseRestService]
    });
  });

  it('should be created', inject([FirebaseRestService], (service: FirebaseRestService) => {
    expect(service).toBeTruthy();
  }));
});
