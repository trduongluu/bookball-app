import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkTypeComponent } from './work-type.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { WorkTypeDataComponent } from './work-type-data/work-type-data.component';
import { WorkTypeRoutes } from './work-type.routing';

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    NgZorroAntdModule,
    WorkTypeRoutes
  ],
  providers: [
    ExtentionTableService
  ],
  declarations: [WorkTypeComponent,WorkTypeDataComponent]
})
export class WorkTypeModule { }
