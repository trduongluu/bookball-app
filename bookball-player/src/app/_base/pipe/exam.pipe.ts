import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exam'
})
export class ExamPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
