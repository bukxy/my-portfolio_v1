import { TestBed } from '@angular/core/testing';

import {SnackBarCall} from './snack-bar';

describe('SnackBarCall', () => {
  let service: SnackBarCall;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackBarCall);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
