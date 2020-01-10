import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesItemGroupComponent } from './expenses-item-group.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { ExpensesItemGroupDataComponent } from './expenses-item-group-data/expenses-item-group-data.component';
import { ExpensesItemGroupRoutes } from './expenses-item-group.routing';

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    NgZorroAntdModule,
    ExpensesItemGroupRoutes
  ],
  providers: [
    ExtentionTableService
  ],
  declarations: [ExpensesItemGroupComponent,ExpensesItemGroupDataComponent]
})
export class ExpensesItemGroupModule { }
