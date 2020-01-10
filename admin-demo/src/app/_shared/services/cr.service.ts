import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../_base/services/base-crud.service';
import { HttpClient } from '@angular/common/http';
import { BindDataExtensionService } from '../extensions/bind-data-extension.service';

@Injectable({
  providedIn: 'root'
})
export class CrService extends BaseCrudService<any> {

  constructor(
    http: HttpClient,
    bindDataExtensionService: BindDataExtensionService
  ) {
    super(http, bindDataExtensionService);
    this.baseUrl = 'Cr';
  }

  getListCrType() {
    return this.bindDataExtensionService.bindResponseApi(this.http.get<Array<{ id: number, name: string }>>(`${this.baseUrl}/ListCrType`));
  }

}
