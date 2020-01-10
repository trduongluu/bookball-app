import { Injectable } from '@angular/core';
import { BindDataExtensionService } from '../extensions/bind-data-extension.service';
import { HttpClient } from '@angular/common/http';
import { BaseCrudService } from '../../_base/services/base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class CollateCostsService extends BaseCrudService<any> {

  constructor(
    http: HttpClient,
    bindDataExtensionService: BindDataExtensionService
  ) {
    super(http, bindDataExtensionService);
    this.baseUrl = 'CollateCosts';
    
  }
}
