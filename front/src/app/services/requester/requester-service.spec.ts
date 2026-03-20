import { TestBed } from '@angular/core/testing';

import { RequesterService } from './requester-service';

describe('Requester', () => {
  let service: RequesterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequesterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
