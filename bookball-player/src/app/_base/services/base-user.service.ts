import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const apiUrl = `${environment.apiUrl}/api`;

@Injectable({
  providedIn: 'root'
})
export class BaseUserService {

  constructor(protected formBuilder: FormBuilder, protected http: HttpClient) { }
  private readonly baseUrl = `${apiUrl}/user`;

  public formModel = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', Validators.email],
    firstName: [''],
    lastName: [''],
    passwords: this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })
  });

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

  register() {
    const body = {
      username: this.formModel.value.username,
      email: this.formModel.value.email,
      firstName: this.formModel.value.firstName,
      lastName: this.formModel.value.lastName,
      password: this.formModel.value.passwords.password
    };
    return this.http.post(`${this.baseUrl}/register-identity`, body);
  }

  login(formData) {
    return this.http.post(`${this.baseUrl}/login-identity`, formData);
  }

  getUserProfile() {
    return this.http.get(`${this.baseUrl}/userprofile`);
  }
}
