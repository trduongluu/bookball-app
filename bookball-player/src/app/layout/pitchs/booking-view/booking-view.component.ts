import { Component, OnInit } from '@angular/core';
import { BaseBookingComponents } from '@trduong/_base/components/base-booking-components';

@Component({
  selector: 'app-booking-view',
  templateUrl: './booking-view.component.html',
  styleUrls: ['./booking-view.component.scss']
})
export class BookingViewComponent extends BaseBookingComponents implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
