import { Routes, RouterModule } from '@angular/router';
import { CrComponent } from './cr.component';

const routes: Routes = [
  { path: '', component: CrComponent },
];

export const CrRoutes = RouterModule.forChild(routes);
