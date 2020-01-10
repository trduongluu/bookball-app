import { Routes, RouterModule } from '@angular/router';
import { PackageBidsComponent } from './package-bids.component';

const routes: Routes = [
  { path: '', component: PackageBidsComponent },
];

export const PackageBidsRoutes = RouterModule.forChild(routes);
