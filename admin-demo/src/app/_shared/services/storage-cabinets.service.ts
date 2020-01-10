import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCrudService } from '../../_base/services/base-crud.service';
import { BindDataExtensionService } from '../extensions/bind-data-extension.service';
import { environment } from '../../../environments/environment';
import { PagedListModel } from '../../_base/models/response-model';
@Injectable({
  providedIn: 'root'
})
export class StorageCabinetsService extends BaseCrudService<any> {

  constructor(
    http: HttpClient,
    bindDataExtensionService: BindDataExtensionService
  ) {
    super(http, bindDataExtensionService);
    this.baseUrl = 'StorageCabinets';
  }

  getEmployee() {
    return this.bindDataExtensionService.bindResponseApi(this.http.get<PagedListModel<any>>(`${environment.apiUrlHRM}/api/employees`));
  }

  getOffice() {
    return this.bindDataExtensionService.bindResponseApi(this.http.get<PagedListModel<any>>(`${environment.apiUrlHRM}/api/company`));
  }

}
