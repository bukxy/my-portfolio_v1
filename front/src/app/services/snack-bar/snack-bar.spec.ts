import { TestBed } from '@angular/core/testing';

import { SnackBar } from './snack-bar';

describe('Snackbar', () => {
  let service: SnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
