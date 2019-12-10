import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const apiUrl = `${environment.apiUrl}/api`;

@Injectable({
  providedIn: 'root'
})
export class BaseUserService {

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }
  private readonly baseUrl = `${apiUrl}/user`;

  public formModel = this.formBuilder.group({
    Username: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
    Passwords: this.formBuilder.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })
  });

  comparePasswords(fgroup: FormGroup) {
    const confirmPwCtrl = fgroup.get('ConfirmPassword');
    // passwordMismatch
    // confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPwCtrl.errors == null || 'passwordMismatch' in confirmPwCtrl.errors) {
      if (fgroup.get('Password').value !== confirmPwCtrl.value) {
        confirmPwCtrl.setErrors({ passwordMismatch: true });
      } else {
        confirmPwCtrl.setErrors(null);
      }
    }
  }

  register() {
    const body = {
      UserName: this.formModel.value.Username,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
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
