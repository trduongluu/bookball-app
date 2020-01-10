import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimal-format'
})
export class DecimalFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

}
