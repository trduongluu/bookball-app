import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingComponent } from './booking.component';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { BookingRoutes } from './booking.routing';
import { BookingDataComponent } from './booking-data/booking-data.component';

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    NgZorroAntdModule,
    BookingRoutes
  ],
  declarations: [BookingComponent, BookingDataComponent]
})
export class BookingModule { }
