import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimesheetDataComponent } from './timesheet-data.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from '../../../_base/modules/form/form.module';
import { TimesheetDataRoutes } from './timesheet-data.routing';

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    NgZorroAntdModule,
    TimesheetDataRoutes
  ],
  declarations: [TimesheetDataComponent],
  exports:[TimesheetDataComponent]
})
export class TimesheetDataModule { }
