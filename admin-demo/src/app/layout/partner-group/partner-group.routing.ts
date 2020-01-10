import { Routes, RouterModule } from '@angular/router';
import { PartnerGroupComponent } from './partner-group.component';

const routes: Routes = [
  { path: '', component: PartnerGroupComponent }
];

export const PartnerGroupRoutes = RouterModule.forChild(routes);
