import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductServicesComponent } from './product-services.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { ProductServicesDataComponent } from './product-services-data/product-services-data.component';
import { ProductServicesRoutes } from './product-services.routing';

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    NgZorroAntdModule,
    ProductServicesRoutes,
  ],
  providers: [
    ExtentionTableService
  ],
  declarations: [ProductServicesComponent,ProductServicesDataComponent]
})
export class ProductServicesModule { }
