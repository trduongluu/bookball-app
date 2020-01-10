import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../_base/services/base-crud.service';
import { BindDataExtensionService } from '../extensions/bind-data-extension.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModeBiddingService extends BaseCrudService<any> {

constructor(
  http: HttpClient,
  bindDataExtensionService: BindDataExtensionService
) {super(http, bindDataExtensionService);
  this.baseUrl = 'ModeBidding'; }

}
