import {ApplicationConfig, provideBrowserGlobalErrorListeners} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {AuthInterceptor} from './interceptors/auth-interceptor';
import {Overlay} from '@angular/cdk/overlay';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {provideMarkdown} from 'ngx-markdown';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideMarkdown(),
    // provideZoneChangeDetection()
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useFactory: (overlay: Overlay) => ({
        scrollStrategy: overlay.scrollStrategies.noop()
      }),
      deps: [Overlay]
    }
  ]
};
