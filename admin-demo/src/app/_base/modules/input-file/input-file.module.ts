import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFileComponent } from './input-file.component';
import { NzPopconfirmModule } from 'ng-zorro-antd';
import { SortablejsModule } from 'ngx-sortablejs';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  imports: [
    CommonModule,
    NzPopconfirmModule,
    NzTableModule,
    NzIconModule,
    SortablejsModule
  ],
  exports: [
    InputFileComponent
  ],
  declarations: [InputFileComponent]
})
export class InputFileModule { }
