import { Routes, RouterModule } from '@angular/router';
import { TimesheetListComponent } from './timesheet-list.component';

const routes: Routes = [
  { path:'',component:TimesheetListComponent },
];

export const TimesheetListRoutes = RouterModule.forChild(routes);
