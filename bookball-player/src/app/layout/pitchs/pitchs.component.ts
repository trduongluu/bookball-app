import { Component, OnInit } from '@angular/core';
import { PitchService } from '@trduong/shared/services/pitch.service';
import { PagingModel } from '@trduong/_base/models/response-model';

@Component({
  selector: 'app-pitchs',
  templateUrl: './pitchs.component.html',
  styleUrls: ['./pitchs.component.scss']
})
export class PitchsComponent implements OnInit {

  loading = false;
  selectedCity = null;
  selectedDistrict = null;
  pitchId: number | string;
  paging: PagingModel = {
    page: 1,
    size: 100
  };
  public listPitch: any[];

  isShowBooking = false;

  constructor(
    private pitchService: PitchService
  ) { }

  async ngOnInit() {
    console.log('token pitch', localStorage.getItem('token'));
    const res = await this.pitchService.get(this.paging);
    if (res.success) {
      this.listPitch = res.result.data;
    }
    console.log('pitchs data', res);
  }

  showModal(item: any): void {
    this.isShowBooking = true;
    this.pitchId = item.id;
  }

  closeBookingView(value: any) {
    this.pitchId = null;
    this.isShowBooking = false;
    console.log('event from booking view', value);
  }

  // handleOk(): void {
  //   this.isOkLoading = true;
  //   setTimeout(() => {
  //     this.isShowBooking = false;
  //     this.isOkLoading = false;
  //   }, 1000);
  // }
}
