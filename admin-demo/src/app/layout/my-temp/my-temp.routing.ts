import { Routes, RouterModule } from '@angular/router';
import { MyTempComponent } from './my-temp.component';

const routes: Routes = [
  { path: '', component: MyTempComponent },
];

export const MyTempRoutes = RouterModule.forChild(routes);
