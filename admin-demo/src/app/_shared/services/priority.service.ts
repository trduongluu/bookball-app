import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../_base/services/base-crud.service';
import { BindDataExtensionService } from '../extensions/bind-data-extension.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PriorityService extends BaseCrudService<any> {
  constructor(
    http: HttpClient,
    bindDataExtensionService: BindDataExtensionService
    ) {
    super(http, bindDataExtensionService);
    this.baseUrl = 'Issue/ListPriority';
  }

  public getAll() {
    const api = this.http.get<any[]>(`${this.baseUrl}`);
    return this.bindDataExtensionService.bindResponseApi(api);
  }
}
