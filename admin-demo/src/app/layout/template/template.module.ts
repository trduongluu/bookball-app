import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from './template.component';
import { TemplateRoutes } from './template.routing';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { TemplateDataComponent } from './template-data/template-data.component';

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    NgZorroAntdModule,
    TemplateRoutes
  ],
  exports:[
    TemplateComponent
  ],
  declarations: [
    TemplateComponent,
    TemplateDataComponent
  ]
})
export class TemplateModule { }
