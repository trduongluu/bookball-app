import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BizModelComponent } from './biz-model.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { BizModelDataComponent } from './biz-model-data/biz-model-data.component';
import { BizModelRoutes } from './biz-model.routing';

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    NgZorroAntdModule,
    BizModelRoutes
  ],
  declarations: [BizModelComponent, BizModelDataComponent]
})
export class BizModelModule { }
