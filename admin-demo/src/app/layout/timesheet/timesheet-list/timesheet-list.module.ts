import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimesheetListComponent } from './timesheet-list.component';
import { TimesheetListRoutes } from './timesheet-list.routing';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';

import { FormModule } from '../../../_base/modules/form/form.module';
import { ImgServerModule } from '../../../_base/modules/img-server/img-server.module';


@NgModule({
  imports: [
    CommonModule,

    FormModule,
    ImgServerModule,
    NgZorroAntdModule,
    TimesheetListRoutes
  ],
  providers: [
    ExtentionTableService
  ],
  declarations: [TimesheetListComponent]
})
export class TimesheetListModule { }
