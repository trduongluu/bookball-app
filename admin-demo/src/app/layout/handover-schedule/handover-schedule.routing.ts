import { Routes, RouterModule } from '@angular/router';
import { HandoverScheduleComponent } from './handover-schedule.component';

const routes: Routes = [
  { path: '', component: HandoverScheduleComponent },
];

export const HandoverScheduleRoutes = RouterModule.forChild(routes);
