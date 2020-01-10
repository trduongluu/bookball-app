import { Routes, RouterModule } from '@angular/router';
import { BiddingDocumentComponent } from './bidding-document.component';

const routes: Routes = [
  { path: '', component: BiddingDocumentComponent },
];

export const BiddingDocumentRoutes = RouterModule.forChild(routes);
