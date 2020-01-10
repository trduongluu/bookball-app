import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralComponent } from './general.component';
import { GeneralRoutes } from './general.routing';
import { NzIconModule, NzModalModule } from 'ng-zorro-antd';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { GeneralDataComponent } from './general-data/general-data.component';

@NgModule({
  imports: [
    CommonModule,
    NzIconModule,
    FormModule,
    NzModalModule,
    GeneralRoutes,
  ],
  declarations: [
    GeneralComponent,
    GeneralDataComponent
  ]
})
export class GeneralModule { }
