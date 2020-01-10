import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractComponent } from './contract.component';
import { ContractRoutes } from './contract.routing';
import { ContractDataComponent } from './contract-data/contract-data.component';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    NgZorroAntdModule,
    ContractRoutes
  ],
  declarations: [
    ContractComponent,
    ContractDataComponent
  ]
})
export class ContractModule { }
