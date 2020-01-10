import { Routes, RouterModule } from '@angular/router';
import { ActualCostsComponent } from './actual-costs.component';

const routes: Routes = [
  {path:'',component:ActualCostsComponent  },
];

export const ActualCostsRoutes = RouterModule.forChild(routes);
