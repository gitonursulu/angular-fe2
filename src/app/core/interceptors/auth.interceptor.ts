import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);

  if (
    req.url.includes('/token') ||
    req.url.includes('/login') ||
    req.url.includes('/register')
  ) {
    return next(req);
  }

  const accessToken = localStorage.getItem('access_token');

  let cloned = req;
  if (accessToken) {
    cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  return next(cloned).pipe(
    catchError(error => {
      if (error.status === 401) {
        return authService.refreshToken().pipe(
          switchMap(() => {
            const newToken = localStorage.getItem('access_token');
            const newReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`
              }
            });
            return next(newReq);
          })
        );
      }
      return throwError(() => error);
    })
  );
};