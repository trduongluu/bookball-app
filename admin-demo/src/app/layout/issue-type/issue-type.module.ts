import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueTypeComponent } from './issue-type.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { IssueTypeDataComponent } from './issue-type-data/issue-type-data.component';
import { IssueTypeRoutes } from './issue-type.routing';

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    NgZorroAntdModule,
    IssueTypeRoutes,
  ],
  providers: [
    ExtentionTableService
  ],
  declarations: [IssueTypeComponent,IssueTypeDataComponent]
})
export class IssueTypeModule { }
