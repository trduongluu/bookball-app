import { Routes, RouterModule } from '@angular/router';
import { IssueCausesComponent } from './issue-causes.component';

const routes: Routes = [
  { path: '', component: IssueCausesComponent },
];

export const IssueCausesRoutes = RouterModule.forChild(routes);
