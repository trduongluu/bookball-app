import { Routes, RouterModule } from '@angular/router';
import { ProjectProfileDetailComponent } from './project-profile-detail.component';

const routes: Routes = [
  { path: '', component: ProjectProfileDetailComponent }
];

export const ProjectProfileDetailRoutes = RouterModule.forChild(routes);
