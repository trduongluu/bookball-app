import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrComponent } from './cr.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from '../../_base/modules/form/form.module';
import { ExtentionTableService } from '../../_base/services/extention-table.service';
import { CrDataComponent } from './cr-data/cr-data.component';
import { CrRoutes } from './cr.routing';
import { CrDataModule } from './cr-data/cr-data.module';

@NgModule({

  imports: [
    CommonModule,
    CrRoutes,
    FormModule,
    NgZorroAntdModule,
    CrDataModule
  ],
  providers: [
    ExtentionTableService
  ],
  declarations: [CrComponent]
})
export class CrModule { }
