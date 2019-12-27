import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutes } from './profile.routing';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DateFormatPipe } from '@trduong/shared/pipes/date-format.pipe';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutes,
    NgZorroAntdModule
  ],
  declarations: [ProfileComponent],
  providers: [DateFormatPipe]
})
export class ProfileModule { }
