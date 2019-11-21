import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', loadChildren: () => import('./pitchs/pitchs.module').then(m => m.PitchsModule) },
      { path: 'temp', loadChildren: () => import('./temp/temp.module').then(m => m.TempModule) }
    ]
  }
];

export const LayoutRoutes = RouterModule.forChild(routes);
