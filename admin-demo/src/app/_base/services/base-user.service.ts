import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { PagingModel } from '../models/response-model';

const apiUrl = `${environment.apiUrl}/api`;

@Injectable({
  providedIn: 'root'
})
export class BaseUserService {

  private readonly baseUrl = `${apiUrl}`;
  public paging: PagingModel = {
    page: 1,
    size: 100
  };


  constructor(
    public formBuilder: FormBuilder,
    protected http: HttpClient
  ) { }

  comparePasswords(fgroup: FormGroup) {
    const confirmPwCtrl = fgroup.get('confirmPassword');
    // passwordMismatch
    // confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPwCtrl.errors == null || 'passwordMismatch' in confirmPwCtrl.errors) {
      if (fgroup.get('password').value !== confirmPwCtrl.value) {
        confirmPwCtrl.setErrors({ passwordMismatch: true });
      } else {
        confirmPwCtrl.setErrors(null);
      }
    }
  }

  register(body: any) {
    return this.http.post(`${this.baseUrl}/user/register-identity`, body);
  }

  login(formData: any) {
    return this.http.post(`${this.baseUrl}/user/login-identity`, formData);
  }

  getUserProfile() {
    return this.http.get(`${this.baseUrl}/userprofile`);
  }

  logout() {
    localStorage.removeItem('token');
  }
}
