import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldComponent } from './field.component';
import { FieldDataComponent } from './field-data/field-data.component';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FieldRoutes } from './field.routing';

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    NgZorroAntdModule,
    FieldRoutes
  ],
  declarations: [FieldComponent, FieldDataComponent]
})
export class FieldModule { }
