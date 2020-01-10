import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentTypeComponent } from './payment-type.component';
import { PaymentTypeRoutes } from './payment-type.routing';
import { PaymentTypeDataComponent } from './payment-type-data/payment-type-data.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from 'src/app/_base/modules/form/form.module';

@NgModule({
  imports: [
    CommonModule,
    PaymentTypeRoutes,
    NgZorroAntdModule,
    FormModule
  ],
  declarations: [PaymentTypeComponent, PaymentTypeDataComponent]
})
export class PaymentTypeModule { }
