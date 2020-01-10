import { Routes, RouterModule } from '@angular/router';
import { BiddingComponent } from './bidding.component';

const routes: Routes = [
  { path: '', component: BiddingComponent },
];

export const BiddingRoutes = RouterModule.forChild(routes);
