import { Routes, RouterModule } from '@angular/router';
import { ProjectTypeComponent } from './project-type.component';

const routes: Routes = [
  { path: '', component: ProjectTypeComponent }
];

export const ProjectTypeRoutes = RouterModule.forChild(routes);
