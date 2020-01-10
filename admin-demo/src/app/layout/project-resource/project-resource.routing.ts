import { Routes, RouterModule } from '@angular/router';
import { ProjectResourceComponent } from './project-resource.component';

const routes: Routes = [
  { path: '', component: ProjectResourceComponent }
];

export const ProjectResourceRoutes = RouterModule.forChild(routes);
