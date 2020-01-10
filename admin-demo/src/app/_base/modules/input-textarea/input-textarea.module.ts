import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextareaComponent } from './input-textarea.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    InputTextareaComponent
  ],
  declarations: [InputTextareaComponent]
})
export class InputTextareaModule { }
