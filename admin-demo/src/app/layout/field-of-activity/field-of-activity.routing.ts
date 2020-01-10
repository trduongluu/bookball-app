import { Routes, RouterModule } from '@angular/router';
import { FieldOfActivityComponent } from './field-of-activity.component';

const routes: Routes = [
  { path: '', component: FieldOfActivityComponent }
];

export const FieldOfActivityRoutes = RouterModule.forChild(routes);
