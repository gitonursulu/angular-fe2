import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home } from './pages/home/home.component';
import { RouterModule } from '@angular/router'; // 🧠 BU ŞART

@NgModule({
  declarations: [
    Home
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    Home
  ]
})
export class HomeModule { }
