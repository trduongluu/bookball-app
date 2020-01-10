import { NgModule } from '@angular/core';
import { DateFormatPipe } from './date-format.pipe';
import { DatetimeFormatPipe } from './datetime-format.pipe';
import { StatusPipe } from './status.pipe';
import { ColorPipe } from './color.pipe';
import { NumberFormatPipe } from './number-format.pipe';
import { DecimalFormatPipe } from './decimal-format.pipe';


@NgModule({
   declarations: [
      DateFormatPipe,
      DatetimeFormatPipe,
      StatusPipe,
      ColorPipe,
      NumberFormatPipe,
      DecimalFormatPipe
   ],
   exports: [
      DateFormatPipe,
      DatetimeFormatPipe,
      StatusPipe,
      ColorPipe,
      NumberFormatPipe
   ]
})
export class PipeModule { }
