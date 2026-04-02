import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ConfigService } from '../services/maintenance/maintenance';

export const maintenanceGuard: CanActivateFn = (route, state) => {
  const config = inject(ConfigService);
  const router = inject(Router);

  if (config.isMaintenance) {
    return router.createUrlTree(['/maintenance']);
  }
  return true;
};
