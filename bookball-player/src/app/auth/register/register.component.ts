import { Component, OnInit } from '@angular/core';
import { BaseUserService } from '@trduong/_base/services/base-user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    public userService: BaseUserService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.userService.formModel.reset();
  }

  onSubmit() {
    this.userService.register().subscribe((res: any) => {
      if (res.succeeded) {
        this.userService.formModel.reset();
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
