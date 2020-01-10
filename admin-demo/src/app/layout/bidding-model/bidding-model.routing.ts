import { Routes, RouterModule } from '@angular/router';
import { BiddingModelComponent } from './bidding-model.component';

const routes: Routes = [
  { path: '', component: BiddingModelComponent },
];

export const BiddingModelRoutes = RouterModule.forChild(routes);
