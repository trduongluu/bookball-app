import { Routes, RouterModule } from '@angular/router';
import { IssueComponent } from './issue.component';

const routes: Routes = [
  { path: '', component: IssueComponent },
];

export const IssueRoutes = RouterModule.forChild(routes);
