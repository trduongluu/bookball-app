import { Component, OnInit } from '@angular/core';
import { BaseUserService } from '@trduong/_base/services/base-user.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserBooking, BookingStatusEnum } from '@trduong/_base/models/booking-models';
import { BookingService } from '@trduong/shared/services/booking.service';
import { DateFormatPipe } from '@trduong/shared/pipes/date-format.pipe';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends BaseUserService implements OnInit {

  public userDetails: any;
  isLoading = false;
  listBooking: UserBooking[];
  waitColor = '#ffdc34';
  bookedColor = '#007944';
  canceledColor = '#9d0b0b';

  constructor(
    formBuilder: FormBuilder,
    http: HttpClient,
    private router: Router,
    private bookingService: BookingService,
    private dateFormat: DateFormatPipe
  ) {
    super(formBuilder, http);
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
        console.log('profile', res);
      },
      err => {
        console.log(err);
      },
    );

    this.getDataBooks();
  }

  async getDataBooks() {
    // this.listBooking = [
    //   {
    //     name: 'An Dương', field: 'Sân 1', day: 'Thứ 4 (23/11)', timeSlot: '16:00 - 17:30', price: '400.000 vnd',
    //     paid: '250.000 vnd', checkin: '15:59 23/11/2019', checkout: '17:50 23/11/2019', status: BookingStatusEnum.Waiting
    //   },
    //   {
    //     name: 'An Dương', field: 'Sân 1', day: 'Thứ 4 (23/11)', timeSlot: '16:00 - 17:30', price: '400.000 vnd',
    //     paid: '250.000 vnd', checkin: '15:59 23/11/2019', checkout: '17:50 23/11/2019', status: BookingStatusEnum.Booked
    //   },
    //   {
    //     name: 'An Dương', field: 'Sân 1', day: 'Thứ 4 (23/11)', timeSlot: '16:00 - 17:30', price: '400.000 vnd',
    //     paid: '250.000 vnd', checkin: '15:59 23/11/2019', checkout: '17:50 23/11/2019', status: BookingStatusEnum.Canceled
    //   },
    // ];
    const res = await this.bookingService.getUserBooks(this.paging);
    if (res.success) {
      console.log('books', res);
      this.listBooking = res.result.data.map(x => {
        return {
          name: x.pitchName, field: x.fieldName,
          day: `${this.dateFormat.transform(x.booking.day, 'dd/MM/yyy')}`, timeSlot: x.booking.timeSlot,
          price: x.booking.price, paid: x.booking.paid, checkin: x.booking.checkin, checkout: x.booking.checkout,
          status: x.booking.status
        };
      });
    }
  }

  onLogout() {
    this.logout();
    this.router.navigate(['/auth/login']);
  }
}
