import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Home } from './features/home/pages/home/home.component';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { PrivatePageComponent } from './features/home/pages/test/private/privatepage.component';
import { PublicPageComponent } from './features/home/pages/test/public/publicpage.component';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'public', component: PublicPageComponent },
  {
    path: 'private',
    component: PrivatePageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
