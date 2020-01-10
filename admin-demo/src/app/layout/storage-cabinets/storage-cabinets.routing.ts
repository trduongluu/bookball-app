import { Routes, RouterModule } from '@angular/router';
import { StorageCabinetsComponent } from './storage-cabinets.component';

const routes: Routes = [
  { path: '', component: StorageCabinetsComponent }
];

export const StorageCabinetsRoutes = RouterModule.forChild(routes);
