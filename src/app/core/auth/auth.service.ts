import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.loadUserFromToken();
  }

  login() {
    const clientId = 'business-portal';
    const redirectUri = window.location.origin;
    const keycloakAuthUrl =
      'http://localhost:8080/realms/nexus/protocol/openid-connect/auth';
    const url = `${keycloakAuthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

    window.location.href = url;
  }

  loadUserFromToken() {
    const token = localStorage.getItem('token');
    if (token) {
      const parsed = this.parseToken(JSON.parse(token).access_token);
      console.log('PARSED TOKEN:', parsed);
      this.userSubject.next(parsed);
    }
  }

  parseToken(token: string): any {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  }

  logout() {
    localStorage.removeItem('token');
    this.userSubject.next(null);
    window.location.href = '/'; // veya router.navigate
  }

  handleCode(): void {
    console.log('HANDLE CODE CALLED', this.route.queryParams);

    this.route.queryParams.subscribe((params) => {
      console.log('PARAMS:', params); // Log the query parameters to see if 'code' is present
      // Check if the 'code' parameter exists in the query parameters
      const code = params['code'];
      if (code) {
        const body = new HttpParams()
          .set('grant_type', 'authorization_code')
          .set('client_id', 'business-portal')
          .set('client_secret', 'zPVI7pi3cdmFoYmcjcGuXxexucpDQf88')
          .set('redirect_uri', window.location.origin)
          .set('code', code);

        this.http
          .post(
            'http://localhost:8080/realms/nexus/protocol/openid-connect/token',
            body
          )
          .subscribe((tokenRes) => {
            localStorage.setItem('token', JSON.stringify(tokenRes));
            console.log('TOKEN ALINDI:', tokenRes);
            this.location.replaceState('/');
            this.loadUserFromToken();
          });
      }
    });
  }

  refreshToken(): Observable<any> {
  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken) {
    this.logout();
    return throwError(() => new Error('No refresh token found'));
  }

  const body = new HttpParams()
    .set('grant_type', 'refresh_token')
    .set('client_id', 'business-portal')
    .set('client_secret', '...') // aynı secret
    .set('refresh_token', refreshToken);

  return this.http
    .post('http://localhost:8080/realms/nexus/protocol/openid-connect/token', body)
    .pipe(
      tap((tokenRes: any) => {
        localStorage.setItem('access_token', tokenRes.access_token);
        localStorage.setItem('refresh_token', tokenRes.refresh_token);
        this.loadUserFromToken();
      }),
      catchError(err => {
        this.logout();
        return throwError(() => err);
      })
    );
}
}
