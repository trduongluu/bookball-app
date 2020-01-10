import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModeBiddingComponent } from './mode-bidding.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { ModeBiddingDataComponent } from './mode-bidding-data/mode-bidding-data.component';
import { ModeBiddingRoutes } from './mode-bidding.routing';

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    NgZorroAntdModule,
    ModeBiddingRoutes
  ],
  providers: [
    ExtentionTableService
  ],
  declarations: [ModeBiddingComponent,ModeBiddingDataComponent]
})
export class ModeBiddingModule { }
