import { NgModule } from '@angular/core';
import { ContractsComponent } from './contracts.component';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ContractsDataComponent } from './contracts-data/contracts-data.component';
import { ContractsRoutes } from './contracts.routing';
import { PaymentScheduleModule } from '../payment-schedule/payment-schedule.module';
import { ProjectDocumentModule } from '../project-work/project-document/project-document.module';

@NgModule({
  declarations: [ContractsComponent, ContractsDataComponent],
  imports: [
    FormModule,
    NgZorroAntdModule,
    ContractsRoutes,
    PaymentScheduleModule,
    ProjectDocumentModule
  ]
})
export class ContractsModule { }
