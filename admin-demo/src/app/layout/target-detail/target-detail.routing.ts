import { Routes, RouterModule } from '@angular/router';
import { TargetDetailComponent } from './target-detail.component';

const routes: Routes = [
  { path: '', component: TargetDetailComponent }
];

export const TargetDetailRoutes = RouterModule.forChild(routes);
