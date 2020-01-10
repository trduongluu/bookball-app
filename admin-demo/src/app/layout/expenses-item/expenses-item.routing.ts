import { Routes, RouterModule } from '@angular/router';
import { ExpensesItemComponent } from './expenses-item.component';

const routes: Routes = [
  { path: '', component: ExpensesItemComponent },
];

export const ExpensesItemRoutes = RouterModule.forChild(routes);
