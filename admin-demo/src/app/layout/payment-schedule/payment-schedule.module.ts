import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentScheduleComponent } from './payment-schedule.component';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { PaymentScheduleDataComponent } from './payment-schedule-data/payment-schedule-data.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    NgZorroAntdModule
  ],
  declarations: [PaymentScheduleComponent, PaymentScheduleDataComponent], exports: [PaymentScheduleComponent]
})
export class PaymentScheduleModule { }
