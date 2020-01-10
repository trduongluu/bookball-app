import { Routes, RouterModule } from '@angular/router';
import { InvestsComponent } from './invests.component';

const routes: Routes = [
  { path: '', component: InvestsComponent },
];

export const InvestsRoutes = RouterModule.forChild(routes);
