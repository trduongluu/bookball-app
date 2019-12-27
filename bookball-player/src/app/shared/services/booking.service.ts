import { Injectable } from '@angular/core';
import { BaseCrudService } from '@trduong/_base/services/base-crud.service';
import { HttpClient } from '@angular/common/http';
import { BindDataExtensionService } from '../extensions/bind-data-extension.service';
import { PagedListModel } from '@trduong/_base/models/response-model';

@Injectable({
  providedIn: 'root'
})
export class BookingService extends BaseCrudService<any> {

  constructor(
    http: HttpClient,
    bindDataExtensionService: BindDataExtensionService
  ) {
    super(http, bindDataExtensionService);
    this.baseUrl = 'booking';
  }

  public userBooking(body: any) {
    const api = this.http.post<any>(`${this.baseUrl}/user-book`, body);
    return this.bindDataExtensionService.bindResponseApi(api);
  }

  public getUserBooks(params: any) {
    const api = this.http.get<PagedListModel<any>>(`${this.baseUrl}/user-bookings`, { params });
    return this.bindDataExtensionService.bindResponseApi(api);
  }
}
