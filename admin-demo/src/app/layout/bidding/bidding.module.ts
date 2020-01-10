import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BiddingComponent } from './bidding.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { BiddingDataComponent } from './bidding-data/bidding-data.component';
import { BiddingRoutes } from './bidding.routing';
@NgModule({
  imports: [
    CommonModule,
    FormModule,
    NgZorroAntdModule,
    BiddingRoutes,
  ],
  providers: [
    ExtentionTableService
  ],
  declarations: [BiddingComponent,BiddingDataComponent]
})
export class BiddingModule { }
