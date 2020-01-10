import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerComponent } from './partner.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { PartnerDataComponent } from './partner-data/partner-data.component';
import { PartnerRoutes } from './partner.routing';

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    NgZorroAntdModule,
    PartnerRoutes
  ],
  providers: [
    ExtentionTableService
  ],
  declarations: [PartnerComponent,PartnerDataComponent]
})
export class PartnerModule { }
