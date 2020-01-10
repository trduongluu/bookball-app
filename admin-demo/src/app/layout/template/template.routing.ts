import { Routes, RouterModule } from '@angular/router';
import { TemplateComponent } from './template.component';

const routes: Routes = [
  { path: '', component: TemplateComponent }
];

export const TemplateRoutes = RouterModule.forChild(routes);
