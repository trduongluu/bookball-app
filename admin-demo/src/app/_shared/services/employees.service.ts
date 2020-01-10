import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BindDataExtensionService } from '../extensions/bind-data-extension.service';
import { environment } from '../../../environments/environment';
import { BaseCrudService } from '../../_base/services/base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService extends BaseCrudService<any> {

  constructor(
    http: HttpClient,
    bindDataExtensionService: BindDataExtensionService
  ) {
    super(http, bindDataExtensionService);

    this.baseUrl = 'employees';
    this.changeUrl(environment.apiUrlHRM);

  }
}
