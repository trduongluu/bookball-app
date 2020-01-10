import { Routes, RouterModule } from '@angular/router';
import { UsersDataComponent } from './users-data/users-data.component';

const routes: Routes = [
  { path: '', component: UsersDataComponent },
];

export const UsersRoutes = RouterModule.forChild(routes);
