import { Routes, RouterModule } from '@angular/router';
import { ProductServicesComponent } from './product-services.component';

const routes: Routes = [
  { path: '', component: ProductServicesComponent },
];

export const ProductServicesRoutes = RouterModule.forChild(routes);
