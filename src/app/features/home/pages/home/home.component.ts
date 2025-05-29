import { Component } from '@angular/core';
import { AuthService } from '../../../../core/auth/auth.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class Home {
  user$: Observable<any>; // 1️⃣ Sadece tanımla

  constructor(public authService: AuthService) {
        this.user$ = this.authService.user$; // 2️⃣ Constructor içinde atama yap
  }

  ngOnInit(): void {
    this.authService.handleCode();
  }

  onLogin() {
    this.authService.login();
  }
}
