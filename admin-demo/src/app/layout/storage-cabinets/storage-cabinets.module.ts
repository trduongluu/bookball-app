import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageCabinetsComponent } from './storage-cabinets.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { StorageCabinetsDataComponent } from './storage-cabinets-data/storage-cabinets-data.component';
import { StorageCabinetsRoutes } from './storage-cabinets.routing';

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    NgZorroAntdModule,
    StorageCabinetsRoutes
  ],
  providers: [
    ExtentionTableService
  ],
  declarations: [StorageCabinetsComponent,StorageCabinetsDataComponent]
})
export class StorageCabinetsModule { }
