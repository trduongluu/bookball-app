import { Component, OnInit } from '@angular/core';
import { BaseUserService } from '@trduong/_base/services/base-user.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends BaseUserService implements OnInit {

  public userDetails: any;

  constructor(
    formBuilder: FormBuilder,
    http: HttpClient,
    private router: Router
  ) {
    super(formBuilder, http);
  }

  ngOnInit() {
    this.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
        console.log('profile', res);
      },
      err => {
        console.log(err);
      },
    );
  }

  onLogout() {
    this.logout();
    this.router.navigate(['/auth/login']);
  }
}
