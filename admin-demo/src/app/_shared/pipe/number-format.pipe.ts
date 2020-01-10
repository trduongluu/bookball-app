import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    return value ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : null;
  }

}
