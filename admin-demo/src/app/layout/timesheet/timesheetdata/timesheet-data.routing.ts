import { Routes, RouterModule } from '@angular/router';
import { TimesheetDataComponent } from './timesheet-data.component';


const routes: Routes = [
  { path: '', component: TimesheetDataComponent },
];

export const TimesheetDataRoutes = RouterModule.forChild(routes);
