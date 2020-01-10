import { Routes, RouterModule } from '@angular/router';
import { AttachmentsComponent } from './attachments.component';

const routes: Routes = [
  { path: '', component: AttachmentsComponent },
];

export const AttachmentsRoutes = RouterModule.forChild(routes);
