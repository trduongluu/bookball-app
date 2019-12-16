import { Component, OnInit } from '@angular/core';
import { BaseUserService } from '@trduong/_base/services/base-user.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseUserService implements OnInit {

  formModel: FormGroup;
  constructor(
    formBuilder: FormBuilder,
    http: HttpClient,
    private message: NzMessageService
  ) {
    super(formBuilder, http);
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formModel = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.email]],
      firstName: [''],
      lastName: [''],
      passwords: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', Validators.required]
      }, { validator: this.comparePasswords })
    });
  }

  onSubmit() {
    const body = {
      username: this.formModel.value.username,
      email: this.formModel.value.email,
      firstName: this.formModel.value.firstName,
      lastName: this.formModel.value.lastName,
      password: this.formModel.value.passwords.password
    };
    this.register(body).subscribe((res: any) => {
      if (res.succeeded) {
        this.formModel.reset();
        this.message.success('Registration successful.');
      } else {
        res.errors.forEach(element => {
          switch (element.code) {
            case 'DuplicateUserName':
              this.message.error('Username is already taken');
              break;

            default:
              this.message.error(element.description);
              break;
          }
        });
      }
    }, err => console.log(err));
  }

}
