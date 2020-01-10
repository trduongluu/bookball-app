import { Routes, RouterModule } from '@angular/router';
import { IssueTypeComponent } from './issue-type.component';

const routes: Routes = [
  { path: '', component: IssueTypeComponent },
];

export const IssueTypeRoutes = RouterModule.forChild(routes);
