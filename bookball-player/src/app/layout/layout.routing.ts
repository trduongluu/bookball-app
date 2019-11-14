import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
      { path: 'temp', loadChildren: () => import('./temp/temp.module').then(m => m.TempModule) }
    ]
  }
];

export const LayoutRoutes = RouterModule.forChild(routes);
