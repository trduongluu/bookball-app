import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusComponent } from './status.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { FormsModule } from '@angular/forms';
import { StatusRoutes } from './status.routing';
import { StatusDataComponent } from './status-data/status-data.component';


@NgModule({
  imports: [
    CommonModule,
    StatusRoutes,
    FormModule,
    NgZorroAntdModule,
    FormsModule
  ],
  providers: [
    ExtentionTableService
  ],
  declarations: [StatusComponent,StatusDataComponent]
})
export class StatusModule { }
