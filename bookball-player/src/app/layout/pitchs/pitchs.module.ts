import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PitchsComponent } from './pitchs.component';
import { PitchsRoutes } from './pitchs.routing';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { BookingViewComponent } from './booking-view/booking-view.component';
import { DateFormatPipe } from '@trduong/shared/pipes/date-format.pipe';

@NgModule({
  imports: [
    CommonModule,
    PitchsRoutes,
    NgZorroAntdModule,
    FormsModule
  ],
  declarations: [PitchsComponent, BookingViewComponent],
  providers: [DateFormatPipe]
})
export class PitchsModule { }
