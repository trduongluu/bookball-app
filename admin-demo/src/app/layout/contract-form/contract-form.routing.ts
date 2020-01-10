import { Routes, RouterModule } from '@angular/router';
import { ContractFormComponent } from './contract-form.component';

const routes: Routes = [
  { path: '', component: ContractFormComponent },
];

export const ContractFormRoutes = RouterModule.forChild(routes);
