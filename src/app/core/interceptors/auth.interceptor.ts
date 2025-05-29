import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
constructor(private authService: AuthService) {}

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  if (req.url.includes('/token') || req.url.includes('/login') || req.url.includes('/register')) {
    return next.handle(req);
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

  return next.handle(cloned).pipe(
    catchError(error => {
      if (error.status === 401) {
        return this.authService.refreshToken().pipe(
          switchMap(() => {
            const newToken = localStorage.getItem('access_token');
            const newReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`
              }
            });
            return next.handle(newReq);
          })
        );
      }
      return throwError(() => error);
    })
  );
}

}
