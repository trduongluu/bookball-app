import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesItemComponent } from './expenses-item.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { ExpensesItemDataComponent } from './expenses-item-data/expenses-item-data.component';
import { ExpensesItemRoutes } from './expenses-item.routing';

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    NgZorroAntdModule,
    ExpensesItemRoutes
  ],
  providers: [
    ExtentionTableService
  ],
  declarations: [ExpensesItemComponent,ExpensesItemDataComponent]
})
export class ExpensesItemModule { }
