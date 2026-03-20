import {HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpClient} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import {AuthService} from '../services/auth/auth-service';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const token = authService.getAccessToken();

  const authReq = token
    ? req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) })
    : req;

  return next(authReq).pipe(
    catchError(err => {
      if (err.status === 401) {
        const http = inject(HttpClient);
        return http.post<{ access_token: string }>('/api/v1/auth/refresh', null,
          { withCredentials: true }
        ).pipe(
          switchMap(res => {
            authService.setAccessToken(res.access_token);
            return next(authReq.clone({
              headers: authReq.headers.set('Authorization', `Bearer ${res.access_token}`)
            }));
          }),
          catchError(() => {
            authService.removeAccessToken();
            return throwError(() => err);
          })
        );
      }
      return throwError(() => err);
    })
  );
};
