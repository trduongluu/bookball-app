import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyTempComponent } from './my-temp.component';
import { MyTempDataComponent } from './my-temp-data/my-temp-data.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { MyTempRoutes } from './my-temp.routing';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    MyTempRoutes
  ],
  declarations: [
    MyTempComponent,
    MyTempDataComponent
  ]
})
export class MyTempModule { }
