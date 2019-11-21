import { Routes, RouterModule } from '@angular/router';
import { PitchsComponent } from './pitchs.component';

const routes: Routes = [
  { path: '', component: PitchsComponent },
];

export const PitchsRoutes = RouterModule.forChild(routes);
