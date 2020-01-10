import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldOfActivityComponent } from './field-of-activity.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { FieldOfActivityRoutes } from './field-of-activity.routing';
import { FieldOfActivityDataComponent } from './field-of-activity-data/field-of-activity-data.component';

@NgModule({
  imports: [
    CommonModule,
    FieldOfActivityRoutes,
    FormModule,
    NgZorroAntdModule,
  ],
  providers: [
    ExtentionTableService
  ],
  declarations: [FieldOfActivityComponent,FieldOfActivityDataComponent]
})
export class FieldOfActivityModule { }
