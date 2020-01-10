import { Routes, RouterModule } from '@angular/router';
import { ManagementFormComponent } from './management-form.component';

const routes: Routes = [
  { path: '', component: ManagementFormComponent },
];

export const ManagementFormRoutes = RouterModule.forChild(routes);
