import { Routes, RouterModule } from '@angular/router';
import { PitchComponent } from './pitch.component';

const routes: Routes = [
  { path: '', component: PitchComponent },
];

export const PitchRoutes = RouterModule.forChild(routes);
