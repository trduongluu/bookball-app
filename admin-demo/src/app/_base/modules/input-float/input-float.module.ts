import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFloatComponent } from './input-float.component';
import { FormsModule } from '@angular/forms';
import { NzInputNumberModule } from 'ng-zorro-antd';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzInputNumberModule,
    TextMaskModule
  ],
  exports:[
    InputFloatComponent
  ],
  declarations: [InputFloatComponent]
})
export class InputFloatModule { }
