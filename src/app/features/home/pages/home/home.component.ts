import { Component } from '@angular/core';
import { AuthService } from '../../../../core/auth/auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class Home {
  user$: Observable<any>;

  constructor(public authService: AuthService) {
        this.user$ = this.authService.user$;
  }

  ngOnInit(): void {
    this.authService.handleCode();
  }

  onLogin() {
    this.authService.login();
  }
}
