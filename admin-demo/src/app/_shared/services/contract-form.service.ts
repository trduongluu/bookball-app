import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCrudService } from '../../_base/services/base-crud.service';
import { BindDataExtensionService } from '../extensions/bind-data-extension.service';

@Injectable({
  providedIn: 'root'
})
export class ContractFormService extends BaseCrudService<any> {

constructor(
  http: HttpClient,
  bindDataExtensionService: BindDataExtensionService
) {
  super(http, bindDataExtensionService);
    this.baseUrl = 'ContractForm';
 }

}
