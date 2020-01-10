import { Routes, RouterModule } from '@angular/router';
import { ContractsComponent } from './contracts.component';

const routes: Routes = [
  { path: '', component: ContractsComponent },
];

export const ContractsRoutes = RouterModule.forChild(routes);
