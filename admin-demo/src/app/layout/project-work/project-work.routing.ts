import { Routes, RouterModule } from '@angular/router';
import { ProjectWorkComponent } from './project-work.component';

const routes: Routes = [
  {path:'',component:ProjectWorkComponent}
];

export const ProjectWorkRoutes = RouterModule.forChild(routes);
