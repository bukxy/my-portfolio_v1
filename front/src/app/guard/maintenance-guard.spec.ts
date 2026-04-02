import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { maintenanceGuardGuard } from './maintenance-guard';

describe('maintenanceGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => maintenanceGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
