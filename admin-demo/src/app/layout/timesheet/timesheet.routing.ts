import { Routes, RouterModule } from '@angular/router';
import { TimesheetComponent } from './timesheet.component';
const routes: Routes = [
  {
    path: '', component: TimesheetComponent, children: [
      { path: '', loadChildren: () => import('./timesheet-list/timesheet-list.module').then(m => m.TimesheetListModule) },
      { path: 'add', loadChildren: () => import('./timesheetdata/timesheet-data.module').then(m => m.TimesheetDataModule) }
    ]
  },
];
export const TimesheetRoutes = RouterModule.forChild(routes);
