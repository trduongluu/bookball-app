import { Routes, RouterModule } from '@angular/router';
import { CostsComponent } from './costs.component';

const routes: Routes = [
  {
    path: '', component: CostsComponent, children: [
      { path: 'expected', loadChildren: () => import('./expected-costs/expected-costs.module').then(x => x.ExpectedCostsModule) },
      { path: 'actual', loadChildren: () => import('./actual-costs/actual-costs.module').then(x => x.ActualCostsModule) },
      { path: 'collate', loadChildren: () => import('./collate-costs/collate-costs.module').then(x => x.CollateCostsModule) },
      { path: 'revenues', loadChildren: () => import('./revenues/revenues.module').then(x => x.RevenuesModule) }
    ]
  },
];

export const CostsRoutes = RouterModule.forChild(routes);
