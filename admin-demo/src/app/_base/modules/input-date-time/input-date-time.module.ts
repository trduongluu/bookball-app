import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputDateTimeComponent } from './input-date-time.component';
import { FormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzDatePickerModule
  ],
  exports:[
    InputDateTimeComponent
  ],
  declarations: [InputDateTimeComponent]
})
export class InputDateTimeModule { }
