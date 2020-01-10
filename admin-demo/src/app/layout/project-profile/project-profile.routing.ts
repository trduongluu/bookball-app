import { Routes, RouterModule } from '@angular/router';
import { ProjectProfileComponent } from './project-profile.component';

const routes: Routes = [
  { path: '', component: ProjectProfileComponent }
];

export const ProjectProfileRoutes = RouterModule.forChild(routes);
