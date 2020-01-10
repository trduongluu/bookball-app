import { Routes, RouterModule } from '@angular/router';
import { TargetComponent } from './target.component';

const routes: Routes = [
  { path: '', component: TargetComponent }
];

export const TargetRoutes = RouterModule.forChild(routes);
