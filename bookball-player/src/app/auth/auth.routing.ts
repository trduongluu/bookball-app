import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: '', redirectTo: '', pathMatch: 'full' }
];

export const AuthRoutes = RouterModule.forChild(routes);
