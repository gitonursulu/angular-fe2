// app.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { Home } from './features/home/pages/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    HttpClientModule,
    Home
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}