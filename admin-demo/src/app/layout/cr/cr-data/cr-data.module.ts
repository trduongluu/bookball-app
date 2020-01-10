import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrDataComponent } from './cr-data.component';
import { FormModule } from '../../../_base/modules/form/form.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [CrDataComponent],
  imports: [
    CommonModule,
    FormModule,
    NgZorroAntdModule
  ],
  exports: [
    CrDataComponent
  ],
})
export class CrDataModule { }
