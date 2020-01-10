import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/api-authorization/authorize.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
    canActivate: [AuthGuard]
  },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '**', redirectTo: '' },
];

export const AppRoutes = RouterModule.forRoot(routes);
