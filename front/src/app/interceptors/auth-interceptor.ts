import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth-service';
import { environment } from '../../environments/environment';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const http = inject(HttpClient);
  const token = authService.getAccessToken();

  const authReq = token
    ? req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) })
    : req;

  return next(authReq).pipe(
    catchError(err => {
      console.log(err.status);
      if (err.status === 401) {
        return http.post<{ access_token: string }>(
          environment.apiURL + 'auth/refresh',
          null,
          { withCredentials: true }
        ).pipe(
          switchMap(res => {
            authService.setAccessToken(res.access_token);
            return next(req.clone({
              headers: req.headers.set('Authorization', `Bearer ${res.access_token}`)
            }));
          }),
          catchError(() => {
            authService.removeAccessToken();
            localStorage.removeItem('isLoggedIn');
            return throwError(() => err);
          })
        );
      }
      return throwError(() => err);
    })
  );
};
