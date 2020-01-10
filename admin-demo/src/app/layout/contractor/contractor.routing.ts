import { Routes, RouterModule } from '@angular/router';
import { ContractorComponent } from './contractor.component';

const routes: Routes = [
  { path: '', component: ContractorComponent },
];

export const ContractorRoutes = RouterModule.forChild(routes);
