import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BindDataExtensionService } from '../extensions/bind-data-extension.service';
import { BaseCrudService } from '../../_base/services/base-crud.service';
@Injectable({
  providedIn: 'root'
})
export class ProjectWorkService extends BaseCrudService<any> {
  constructor(http: HttpClient,
    bindDataExtensionService: BindDataExtensionService) {
    super(http, bindDataExtensionService);
    this.baseUrl = 'ProjWorks';
  }

}
