import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutes } from './home.routing';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from '../../_base/modules/form/form.module';
@NgModule({
  imports: [
    CommonModule,
    HomeRoutes,
    FormModule,
    NgZorroAntdModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
