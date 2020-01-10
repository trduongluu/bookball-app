import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TargetComponent } from './target.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { TargetRoutes } from './target.routing';
import { TargetDataComponent } from './target-data/target-data.component';


@NgModule({
  imports: [
    CommonModule,
    TargetRoutes,
    FormModule,
    NgZorroAntdModule
  ],
  providers: [
    ExtentionTableService
  ],
  declarations: [TargetComponent,TargetDataComponent]
})
export class TargetModule { }
