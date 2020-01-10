import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActualCostsComponent } from './actual-costs.component';
import { ActualCostsRoutes } from './actual-costs.routing';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { ActualCostsDataComponent } from './actual-costs-data/actual-costs-data.component';
import { PipeModule } from 'src/app/_shared/pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    ActualCostsRoutes,
    NgZorroAntdModule,
    FormModule,
    PipeModule
  ],
  declarations: [ActualCostsComponent,ActualCostsDataComponent],
  exports:[ActualCostsDataComponent]
})
export class ActualCostsModule { }
