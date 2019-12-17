import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BindDataExtensionService } from '@trduong/shared/extensions/bind-data-extension.service';
import { PagedListModel } from '../models/response-model';

const apiUrl = `${environment.apiUrl}/api`;

@Injectable({
  providedIn: 'root'
})
export class BaseCrudService<T> {

  // tslint:disable-next-line: variable-name
  private _baseUrl: string;
  public get baseUrl(): string {
    return this._baseUrl;
  }
  public set baseUrl(v: string) {
    this._baseUrl = `${apiUrl}/${v}`;
  }

  constructor(
    protected http: HttpClient,
    protected bindDataExtensionService: BindDataExtensionService
  ) { }

  public get(params: any) {
    const api = this.http.get<PagedListModel<T>>(`${this.baseUrl}`, { params: this.stringifyParams(params) });
    return this.bindDataExtensionService.bindResponseApi(api);
  }

  public add(body: any) {
    const api = this.http.post<T>(`${this.baseUrl}`, body);
    return this.bindDataExtensionService.bindResponseApi(api);
  }

  public edit(id: number, body: any) {
    const api = this.http.put<T>(`${this.baseUrl}/${id}`, body);
    return this.bindDataExtensionService.bindResponseApi(api);
  }

  public patch(id: number, body: any) {
    const api = this.http.patch<T>(`${this.baseUrl}/${id}`, body);
    return this.bindDataExtensionService.bindResponseApi(api);
  }

  public findOne(params: any) {
    const api = this.http.get<T>(`${this.baseUrl}/findOne`, { params: this.stringifyParams(params) });
    return this.bindDataExtensionService.bindResponseApi(api);
  }

  public findOneById(id: any) {
    const api = this.http.get<T>(`${this.baseUrl}/findOneById/${id}`);
    return this.bindDataExtensionService.bindResponseApi(api);
  }

  public delete(id: any) {
    const api = this.http.delete<T>(`${this.baseUrl}/${id}`);
    return this.bindDataExtensionService.bindResponseApi(api);
  }

  public uploadFile(body: any) {
    const api = this.http.post<T>(`${this.baseUrl}/upload`, body);
    return this.bindDataExtensionService.bindResponseApi(api);
  }

  private stringifyParams(params: any) {
    const paramsCopy = JSON.parse(JSON.stringify(params));
    Object.keys(paramsCopy).forEach(key => {
      if (typeof paramsCopy[key] === 'object') {
        paramsCopy[key] = JSON.stringify(paramsCopy[key]);
      }
    });
    return paramsCopy;
  }

}
