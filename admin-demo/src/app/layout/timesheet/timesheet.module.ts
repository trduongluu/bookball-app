import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimesheetComponent } from './timesheet.component';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import {TimesheetRoutes} from './timesheet.routing';


@NgModule({
  declarations: [TimesheetComponent],
  imports: [
    TimesheetRoutes,
    CommonModule,
    FormModule,
    NgZorroAntdModule
  ],
  exports: []
})
export class TimesheetModule { }
