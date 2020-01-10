import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';

const routes: Routes = [
  { path: '', component: RegisterComponent },
];

export const RegisterRoutes = RouterModule.forChild(routes);
