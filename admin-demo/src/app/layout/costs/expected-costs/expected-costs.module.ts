import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpectedCostsComponent } from './expected-costs.component';
import { ExpectedCostsDataComponent } from './expected-costs-data/expected-costs-data.component';
import { ExpectedCostsRoutes } from './expected-costs.routing';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { FormsModule } from '@angular/forms';
import { NumberFormatPipe } from 'src/app/_shared/pipe/number-format.pipe';
import { PipeModule } from 'src/app/_shared/pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    ExpectedCostsRoutes,
    NgZorroAntdModule,
    FormModule,
    FormsModule,
    PipeModule
  ],
  declarations: [ExpectedCostsComponent,ExpectedCostsDataComponent],
  exports:[ExpectedCostsDataComponent]
})
export class ExpectedCostsModule { }
