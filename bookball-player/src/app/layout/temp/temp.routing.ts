import { Routes, RouterModule } from '@angular/router';
import { TempComponent } from './temp.component';

const routes: Routes = [
  { path: '', component: TempComponent },
];

export const TempRoutes = RouterModule.forChild(routes);
