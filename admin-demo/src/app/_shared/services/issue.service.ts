import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCrudService } from '../../_base/services/base-crud.service';
import { BindDataExtensionService } from '../extensions/bind-data-extension.service';

@Injectable({
  providedIn: 'root'
})
export class IssueService extends BaseCrudService<any> {

  constructor(
    http: HttpClient,
    bindDataExtensionService: BindDataExtensionService
  ) {
    super(http, bindDataExtensionService);
    this.baseUrl = 'Issue';
  }
  public getListType() {
    const api = this.http.get<any>(`${this.baseUrl}/ListLevelIssue`);
    return this.bindDataExtensionService.bindResponseApi(api);
  }
  public ListPriority() {
    const api = this.http.get<any>(`${this.baseUrl}/ListPriority`);
    return this.bindDataExtensionService.bindResponseApi(api);
  }
  public ListLevelIssue() {
    const api = this.http.get<any>(`${this.baseUrl}/ListLevelIssue`);
    return this.bindDataExtensionService.bindResponseApi(api);
  }

}
