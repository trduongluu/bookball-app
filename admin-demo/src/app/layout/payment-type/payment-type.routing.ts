import { Routes, RouterModule } from '@angular/router';
import { PaymentTypeComponent } from './payment-type.component';

const routes: Routes = [
  { path: '', component: PaymentTypeComponent },
];

export const PaymentTypeRoutes = RouterModule.forChild(routes);
