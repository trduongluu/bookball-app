import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputYearComponent } from './input-year.component';
import { FormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzDatePickerModule
  ],
  exports:[
    InputYearComponent
  ],
  declarations: [InputYearComponent]
})
export class InputYearModule { }
