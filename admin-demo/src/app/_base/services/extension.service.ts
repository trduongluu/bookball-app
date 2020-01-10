import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExtensionService {

  constructor() { }

  public logDebug(mess?: any, ...params: any[]) {
    if (!environment.production) {
      console.debug(mess, params);
    }
  }

  public BoDau(obj: string, reSpace: string = ' ', toLower: boolean = true) {
    let str = obj;
    if (str === undefined || str === null || str === '') {
      return '';
    }
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    // str= str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,"-");
    // tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - /
    // str= str.replace(/-+-/g,"-"); //thay thế 2- thành 1-
    str = str.replace(/^\-+|\-+$/g, '');
    // cắt bỏ ký tự - ở đầu và cuối chuỗi
    str = str.replace(new RegExp('\\s+', 'g'), ' ');
    if (reSpace !== null) {
      str = str.replace(new RegExp(' ', 'g'), reSpace);
    }
    str=str.trim();
    if (toLower !== null) {
      if (toLower) {
        str = str.toLowerCase();
      } else {
        str = str.toUpperCase();
      }
    }

    return str;
  }
}
