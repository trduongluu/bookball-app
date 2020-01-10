import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsOfPaymentComponent } from './terms-of-payment.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { TermsOfPaymentDataComponent } from './terms-of-payment-data/terms-of-payment-data.component';
import { TermsOfPaymentRoutes } from './terms-of-payment.routing';

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    NgZorroAntdModule,
    TermsOfPaymentRoutes,
  ],
  providers: [
    ExtentionTableService
  ],
  declarations: [TermsOfPaymentComponent,TermsOfPaymentDataComponent]
})
export class TermsOfPaymentModule { }
