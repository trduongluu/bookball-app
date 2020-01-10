import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollateCostsComponent } from './collate-costs.component';
import { CollateCostsRoutes } from './collate-costs.routing';
import { CollateCostsDataComponent } from './collate-costs-data/collate-costs-data.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from '../../../_base/modules/form/form.module';
import { FormsModule } from '@angular/forms';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
@NgModule({
  imports: [
    CommonModule,
    CollateCostsRoutes,
    FormsModule,
    FormModule,
    NgZorroAntdModule, NzCollapseModule, NzCheckboxModule
  ],
  declarations: [CollateCostsComponent, CollateCostsDataComponent],
  exports: [CollateCostsDataComponent]
})
export class CollateCostsModule { }
