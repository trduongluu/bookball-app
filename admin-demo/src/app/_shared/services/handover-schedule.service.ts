import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../_base/services/base-crud.service';
import { HttpClient } from '@angular/common/http';
import { BindDataExtensionService } from '../extensions/bind-data-extension.service';

@Injectable({
  providedIn: 'root'
})
export class HandoverScheduleService extends BaseCrudService<any> {

  constructor(
    http: HttpClient,
    bindDataExtensionService: BindDataExtensionService
  ) {
    super(http, bindDataExtensionService);
    this.baseUrl = 'HandoverSchedule';
  }
  public editData(id: string, body: any) {
    const api = this.http.put<any>(`${this.baseUrl}/${id}`, body);
    return this.bindDataExtensionService.bindResponseApi(api);
  }
}
