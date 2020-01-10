import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputDateComponent } from './input-date.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzDatePickerModule
  ],
  exports:[
    InputDateComponent
  ],
  declarations: [InputDateComponent]
})
export class InputDateModule { }
