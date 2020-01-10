import { OptionModel } from 'src/app/_base/models/option-model';
import { environment } from 'src/environments/environment';
import * as uuidv4 from 'uuid/v4';

export class Utilities {

  static getListOptionFromEnum(obj: any): OptionModel[] {
    return Object.keys(obj).filter(x => !isNaN(+x)).map(x => {
      return {
        value: +x,
        text: this.pascalCaseToSpace(obj[x] as string)
      };
    });
  }

  static getListOptionFromEnumStr(obj: any): OptionModel[] {
    return Object.keys(obj).map(x => {
      return {
        value: x,
        text: obj[x]
      };
    });
  }

  static pascalCaseToSpace(value: string) {
    return value.replace(/([A-Z])/g, ' $1');
  }

  static logDebug(mess?: any, ...params: any[]) {
    if (!environment.production) {
      // tslint:disable-next-line: no-console
      console.debug(mess, params);
    }
  }

  static guid() {
    return uuidv4();
  }

  static DateNowUTC() {
    const dateNow = new Date();
    return new Date(Date.UTC(dateNow.getUTCFullYear(), dateNow.getUTCMonth(), dateNow.getUTCDate()));
  }

  static DateTimeNowUTC() {
    const dateNow = new Date();
    return new Date(Date.UTC(dateNow.getUTCFullYear(), dateNow.getUTCMonth(), dateNow.getUTCDate(),
      dateNow.getUTCHours(), dateNow.getUTCMinutes(), dateNow.getUTCSeconds(), dateNow.getUTCMilliseconds()));
  }
}
