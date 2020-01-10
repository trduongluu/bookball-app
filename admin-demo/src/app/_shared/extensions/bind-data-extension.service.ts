import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel, ErrorsModel } from 'src/app/_base/models/response-model';
import { HttpErrorResponse } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BindDataExtensionService {

  constructor(
    private notification: NzNotificationService
  ) { }

  async bindResponseApi<T>(api: Observable<T>) {
    const data = new ResponseModel<T>();
    await api.toPromise()
      .then(value => data.result = value)
      .catch((err: any) => {
        if (err instanceof HttpErrorResponse) {
          data.errors = err.error;
        }
        // data.error = err.error;
      });
    return data;
  }

  bindErrorsNotification(reason: HttpErrorResponse) {
    switch (reason.status) {
      case 400:
        const errors = reason.error as ErrorsModel;
        for (const key in errors) {
          for (const error of errors[key]) {
            this.notification.warning(key || 'Error', error);
          }
        }
        break;
      case 409:
        this.notification.warning('Conflict', reason.error);
        break;
      default:
        break;
    }
  }

  bindErrorFormGroup(myForm: FormGroup, errors: ErrorsModel) {

  }
}
