import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestsComponent } from './invests.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { InvestsDataComponent } from './invests-data/invests-data.component';
import { InvestsRoutes } from './invests.routing';


@NgModule({
  imports: [
    CommonModule,
    FormModule,
    NgZorroAntdModule,
    InvestsRoutes
  ],
  providers: [
    ExtentionTableService
  ],
  declarations: [InvestsComponent,InvestsDataComponent]
})
export class InvestsModule { }
