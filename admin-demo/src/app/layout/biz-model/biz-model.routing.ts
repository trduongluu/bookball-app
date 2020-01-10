import { Routes, RouterModule } from '@angular/router';
import { BizModelComponent } from './biz-model.component';

const routes: Routes = [
  { path: '', component: BizModelComponent },
];

export const BizModelRoutes = RouterModule.forChild(routes);
