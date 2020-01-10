import { Routes, RouterModule } from '@angular/router';
import { ProjectGroupComponent } from './project-group.component';

const routes: Routes = [
  { path: '', component: ProjectGroupComponent }
];

export const ProjectGroupRoutes = RouterModule.forChild(routes);
