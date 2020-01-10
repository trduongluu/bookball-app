import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementFormComponent } from './management-form.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { ManagementFormRoutes } from './management-form.routing';
import { ManagementFormDataComponent } from './management-form-data/management-form-data.component';

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    NgZorroAntdModule,
    ManagementFormRoutes,
  ],
  providers: [
    ExtentionTableService
  ],
  declarations: [ManagementFormComponent,ManagementFormDataComponent]
})
export class ManagementFormModule { }
