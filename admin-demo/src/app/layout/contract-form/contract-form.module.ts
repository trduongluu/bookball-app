import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractFormComponent } from './contract-form.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { ContractFormDataComponent } from './contract-form-data/contract-form-data.component';
import { ContractFormRoutes } from './contract-form.routing';
ContractFormRoutes

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    NgZorroAntdModule,
    ContractFormRoutes
  ],
  providers: [
    ExtentionTableService
  ],
  declarations: [ContractFormComponent,ContractFormDataComponent]
})
export class ContractFormModule { }
