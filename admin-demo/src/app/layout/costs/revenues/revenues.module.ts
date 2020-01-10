import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevenuesComponent } from './revenues.component';
import { RevenuesRoutes } from './revenues.routing';
import { RevenusesDataComponent } from './revenuses-data/revenuses-data.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { PipeModule } from 'src/app/_shared/pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    RevenuesRoutes,
    NgZorroAntdModule,
    FormModule,
    PipeModule
  ],
  declarations: [RevenuesComponent,RevenusesDataComponent],
  exports:[RevenusesDataComponent]
})
export class RevenuesModule { }
