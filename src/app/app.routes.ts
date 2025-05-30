import { Routes } from '@angular/router';
import { Home } from './features/home/pages/home/home.component';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { PrivatePageComponent } from './features/home/pages/test/private/privatepage.component';
import { PublicPageComponent } from './features/home/pages/test/public/publicpage.component';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'public', component: PublicPageComponent },
  ];