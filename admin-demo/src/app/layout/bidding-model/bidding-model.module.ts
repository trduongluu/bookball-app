import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BiddingModelComponent } from './bidding-model.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { BiddingModelDataComponent } from './bidding-model-data/bidding-model-data.component';
import { BiddingModelRoutes } from './bidding-model.routing';

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    NgZorroAntdModule,
    BiddingModelRoutes
  ],
  providers: [
    ExtentionTableService
  ],
  declarations: [BiddingModelComponent,BiddingModelDataComponent]
})
export class BiddingModelModule { }
