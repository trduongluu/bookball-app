import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'date-format'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {

  transform(value: any, format?: string): any {
    return super.transform(value, format);
  }

}
