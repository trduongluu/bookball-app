import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractorComponent } from './contractor.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { ContractorDataComponent } from './contractor-data/contractor-data.component';
import { ContractorRoutes } from './contractor.routing';


@NgModule({
  imports: [
    CommonModule,
    FormModule,
    NgZorroAntdModule,
    ContractorRoutes
  ],
  providers: [
    ExtentionTableService
  ],
  declarations: [ContractorComponent, ContractorDataComponent]
})
export class ContractorModule { }
