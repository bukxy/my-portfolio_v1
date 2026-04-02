import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { maintenanceDisabledGuardGuard } from './maintenance-disabled-guard';

describe('maintenanceDisabledGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => maintenanceDisabledGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
