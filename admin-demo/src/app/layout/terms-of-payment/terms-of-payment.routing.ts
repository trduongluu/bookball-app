import { Routes, RouterModule } from '@angular/router';
import { TermsOfPaymentComponent } from './terms-of-payment.component';

const routes: Routes = [
  { path: '', component: TermsOfPaymentComponent },
];

export const TermsOfPaymentRoutes = RouterModule.forChild(routes);
