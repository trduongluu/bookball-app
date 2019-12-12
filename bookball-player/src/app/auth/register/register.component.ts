import { Component, OnInit } from '@angular/core';
import { BaseUserService } from '@trduong/_base/services/base-user.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseUserService implements OnInit {

  constructor(
    // public userService: BaseUserService,
    formBuilder: FormBuilder,
    http: HttpClient,
    private toastr: ToastrService
  ) {
    super(formBuilder, http);
  }

  ngOnInit() {
    this.formModel.reset();
  }

  onSubmit() {
    this.register().subscribe((res: any) => {
      if (res.succeeded) {
        this.formModel.reset();
        this.toastr.success('New user created!', 'Registration successful.');
      } else {
        res.errors.forEach(element => {
          switch (element.code) {
            case 'DuplicateUserName':
              this.toastr.error('Username is already taken', 'Registration failed.');
              break;

            default:
              this.toastr.error(element.description, 'Registration failed.');
              break;
          }
        });
      }
    }, err => console.log(err));
  }

}
