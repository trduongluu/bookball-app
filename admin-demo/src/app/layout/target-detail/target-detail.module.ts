import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TargetDetailComponent } from './target-detail.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { TargetDetailRoutes } from './target-detail.routing';
import { TargetDetailDataComponent } from './target-detail-data/target-detail-data.component';


@NgModule({
  imports: [
    CommonModule,
    TargetDetailRoutes,
    FormModule,
    NgZorroAntdModule,
  ],
  declarations: [TargetDetailComponent,TargetDetailDataComponent]
})
export class TargetDetailModule { }
