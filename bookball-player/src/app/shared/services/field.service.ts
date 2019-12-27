import { Injectable } from '@angular/core';
import { BaseCrudService } from '@trduong/_base/services/base-crud.service';
import { HttpClient } from '@angular/common/http';
import { BindDataExtensionService } from '../extensions/bind-data-extension.service';
import { PagedListModel } from '@trduong/_base/models/response-model';

@Injectable({
  providedIn: 'root'
})
export class FieldService extends BaseCrudService<any> {

  constructor(
    http: HttpClient,
    bindDataExtensionService: BindDataExtensionService
  ) {
    super(http, bindDataExtensionService);
    this.baseUrl = 'field';
  }

  public getFieldsOfPitch(params: any, pitchId: number | string) {
    const api = this.http.get<PagedListModel<any>>(`${this.baseUrl}/of-pitch/${pitchId}`, { params });
    return this.bindDataExtensionService.bindResponseApi(api);
  }
}
