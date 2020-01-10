import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueCausesComponent } from './issue-causes.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { IssueCausesDataComponent } from './issue-causes-data/issue-causes-data.component';
import { IssueCausesRoutes } from './issue-causes.routing';

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    NgZorroAntdModule,
    IssueCausesRoutes
  ],
  providers: [
    ExtentionTableService
  ],
  declarations: [IssueCausesComponent,IssueCausesDataComponent]
})
export class IssueCausesModule { }
