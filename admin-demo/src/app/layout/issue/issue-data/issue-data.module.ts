import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueDataComponent } from './issue-data.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from '../../../_base/modules/form/form.module';

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    NgZorroAntdModule
  ],
  exports: [
    IssueDataComponent
  ],
  declarations: [IssueDataComponent]
})
export class IssueDataModule { }
