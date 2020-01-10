import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerGroupComponent } from './partner-group.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { PartnerGroupRoutes } from './partner-group.routing';
import { PartnerGroupDataComponent } from './partner-group-data/partner-group-data.component';
@NgModule({
  imports: [
    CommonModule,
    FormModule,
    NgZorroAntdModule,
    PartnerGroupRoutes
  ],
  providers: [
    ExtentionTableService
  ],
  declarations: [PartnerGroupComponent,PartnerGroupDataComponent]
})
export class PartnerGroupModule { }
