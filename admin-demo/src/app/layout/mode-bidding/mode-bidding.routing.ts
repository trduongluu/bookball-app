import { Routes, RouterModule } from '@angular/router';
import { ModeBiddingComponent } from './mode-bidding.component';

const routes: Routes = [
  { path: '', component: ModeBiddingComponent },
];

export const ModeBiddingRoutes = RouterModule.forChild(routes);
