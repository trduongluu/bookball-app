import { Routes, RouterModule } from '@angular/router';
import { CollateCostsComponent } from './collate-costs.component';

const routes: Routes = [
  { path:'',component:CollateCostsComponent },
];

export const CollateCostsRoutes = RouterModule.forChild(routes);
