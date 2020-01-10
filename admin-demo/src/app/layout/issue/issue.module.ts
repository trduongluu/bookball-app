import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueComponent } from './issue.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { IssueRoutes } from './issue.routing';
import { IssueDataModule } from './issue-data/issue-data.module';

@NgModule({
  imports: [
    CommonModule,
    IssueRoutes,
    FormModule,
    NgZorroAntdModule,
    IssueDataModule
  ],
  providers: [
    ExtentionTableService
  ],
  declarations: [IssueComponent]
})
export class IssueModule { }
