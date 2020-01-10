import { NgModule } from '@angular/core';
import { HandoverScheduleComponent } from './handover-schedule.component';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HandoverScheduleDataComponent } from './handover-schedule-data/handover-schedule-data.component';
import { HandoverScheduleRoutes } from './handover-schedule.routing';
import { PaymentScheduleModule } from '../payment-schedule/payment-schedule.module';
import { ProjectDocumentModule } from '../project-work/project-document/project-document.module';

@NgModule({
  declarations: [HandoverScheduleComponent, HandoverScheduleDataComponent],
  imports: [
    FormModule,
    NgZorroAntdModule,
    HandoverScheduleRoutes,
    PaymentScheduleModule,
    ProjectDocumentModule
  ]
})
export class HandoverScheduleModule { }
