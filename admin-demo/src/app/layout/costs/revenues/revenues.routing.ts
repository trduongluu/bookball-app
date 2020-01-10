import { Routes, RouterModule } from '@angular/router';
import { RevenuesComponent } from './revenues.component';

const routes: Routes = [
  { path:'',component:RevenuesComponent },
];

export const RevenuesRoutes = RouterModule.forChild(routes);
