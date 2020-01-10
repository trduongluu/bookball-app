import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../_base/services/base-crud.service';
import { HttpClient } from '@angular/common/http';
import { BindDataExtensionService } from '../extensions/bind-data-extension.service';
import { environment } from '../../../environments/environment';
import { PagedListModel } from '../../_base/models/response-model';

@Injectable({
  providedIn: 'root'
})
export class PartnerService extends BaseCrudService<any> {

  constructor(
    http: HttpClient,
    bindDataExtensionService: BindDataExtensionService
  ) {
    super(http, bindDataExtensionService);
    this.baseUrl = 'Partner';
  }

  getNational() {
    return this.bindDataExtensionService.bindResponseApi(this.http.get<PagedListModel<any>>(`${environment.apiUrlHRM}/api/Country`));
  }

  getGender() {
    return this.bindDataExtensionService.bindResponseApi(this.http.get<PagedListModel<any>>(`${environment.apiUrlHRM}/api/Gender`));
  }
}
