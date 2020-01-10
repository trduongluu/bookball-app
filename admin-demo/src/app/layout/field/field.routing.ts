import { Routes, RouterModule } from '@angular/router';
import { FieldComponent } from './field.component';

const routes: Routes = [
  { path: '', component: FieldComponent },
];

export const FieldRoutes = RouterModule.forChild(routes);
