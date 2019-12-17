import { Component, OnInit } from '@angular/core';
import { BaseUserService } from '@trduong/_base/services/base-user.service';
import { Router } from '@angular/router';
import { NgForm, FormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseUserService implements OnInit {

  formModel = {
    username: '',
    password: ''
  };
  constructor(
    formBuilder: FormBuilder,
    http: HttpClient,
    private router: Router,
    private message: NzMessageService
  ) {
    super(formBuilder, http);
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('/page/pitch');
    }
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.login(form.value).subscribe((res: any) => {
      localStorage.setItem('token', res.token);
      this.router.navigateByUrl('/page/pitch');
    }, err => {
      if (err.status === 400) {
        this.message.error('Incorrect username or password.');
      } else {
        this.message.error('There is an error occured.');
        console.log(err);
      }
    }
    );
  }
}
