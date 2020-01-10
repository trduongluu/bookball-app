import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../../src/app/_base/services/base-crud.service';
import { HttpClient } from '@angular/common/http';
import { BindDataExtensionService } from '../extensions/bind-data-extension.service';


@Injectable({
  providedIn: 'root'
})
export class ProjectGeneralService extends BaseCrudService<any>{

  constructor(http: HttpClient,
    bindDataExtensionService: BindDataExtensionService) {
    super(http, bindDataExtensionService);
    this.baseUrl = 'ProjGeneral';
  }
  public getTableModal(tag: string, params: any = null) {
    let url = `http://10.0.10.92:5000//api/Table/${tag}`;
    if (params.where != null && typeof params.where !== 'string') {
      params.where = JSON.stringify(params.where);
    }
    return this.http.get<any>(`${url}`, params).toPromise();
  }

}
