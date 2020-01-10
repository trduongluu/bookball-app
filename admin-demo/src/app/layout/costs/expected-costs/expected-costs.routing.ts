import { Routes, RouterModule } from '@angular/router';
import { ExpectedCostsComponent } from './expected-costs.component';

const routes: Routes = [
  { path:'',component:ExpectedCostsComponent },
];

export const ExpectedCostsRoutes = RouterModule.forChild(routes);
