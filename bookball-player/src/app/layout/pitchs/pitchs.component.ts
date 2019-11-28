import { Component, OnInit } from '@angular/core';
import { PitchService } from '@trduong/_shared/services/pitch.service';

@Component({
  selector: 'app-pitchs',
  templateUrl: './pitchs.component.html',
  styleUrls: ['./pitchs.component.scss']
})
export class PitchsComponent implements OnInit {

  loading = false;
  selectedCity = null;
  selectedDistrict = null;
  public listPitch: any[];

  constructor(
    private pitchService: PitchService
  ) { }

  async ngOnInit() {
    const res = await this.pitchService.get({});
    if (res.success) {
      this.listPitch = res.result.data;
    }
    console.log('data is here', res);
  }

}
