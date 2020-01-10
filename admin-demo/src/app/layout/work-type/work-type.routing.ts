import { Routes, RouterModule } from '@angular/router';
import { WorkTypeComponent } from './work-type.component';

const routes: Routes = [
  { path: '', component: WorkTypeComponent },
];

export const WorkTypeRoutes = RouterModule.forChild(routes);
