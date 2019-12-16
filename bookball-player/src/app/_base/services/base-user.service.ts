import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const apiUrl = `${environment.apiUrl}/api`;

@Injectable({
  providedIn: 'root'
})
export class BaseUserService {

  constructor(public formBuilder: FormBuilder, protected http: HttpClient) { }
  private readonly baseUrl = `${apiUrl}/user`;

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
    return this.http.post(`${this.baseUrl}/register-identity`, body);
  }

  login(formData: any) {
    return this.http.post(`${this.baseUrl}/login-identity`, formData);
  }

  getUserProfile() {
    return this.http.get(`${this.baseUrl}/userprofile`);
  }
}
