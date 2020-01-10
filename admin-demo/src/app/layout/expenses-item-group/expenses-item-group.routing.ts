import { Routes, RouterModule } from '@angular/router';
import { ExpensesItemGroupComponent } from './expenses-item-group.component';

const routes: Routes = [
  { path: '', component: ExpensesItemGroupComponent },
];

export const ExpensesItemGroupRoutes = RouterModule.forChild(routes);
