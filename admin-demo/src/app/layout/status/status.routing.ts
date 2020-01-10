import { Routes, RouterModule } from '@angular/router';
import { StatusComponent } from './status.component';

const routes: Routes = [
  { path: '', component: StatusComponent }
];

export const StatusRoutes = RouterModule.forChild(routes);
