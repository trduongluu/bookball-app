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
  paging: PagingModel = {
    page: 1,
    size: 100
  };
  public listPitch: any[];

  isShowBooking = false;
  isOkLoading = false;

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

  showModal(): void {
    this.isShowBooking = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isShowBooking = false;
      this.isOkLoading = false;
    }, 1000);
  }
}
