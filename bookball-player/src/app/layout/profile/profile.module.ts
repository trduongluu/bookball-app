import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutes } from './profile.routing';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutes
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
