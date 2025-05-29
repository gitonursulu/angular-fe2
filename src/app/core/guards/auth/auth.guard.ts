import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Access granted. Token found.');
      return true;
    }

    // Token yoksa logine yönlendir
    this.router.navigate(['/']);
    console.warn('Access denied. Redirecting to login.');
    return false;
  }
}
