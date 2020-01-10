import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from './input-text.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NzInputModule,
    FormsModule
  ],
  exports:[
    InputTextComponent
  ],
  declarations: [InputTextComponent]
})
export class InputTextModule { }
