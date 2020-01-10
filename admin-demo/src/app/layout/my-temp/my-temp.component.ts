import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/_base/components/base-list-component';

@Component({
  selector: 'app-my-temp',
  templateUrl: './my-temp.component.html',
  styleUrls: ['./my-temp.component.scss']
})
export class MyTempComponent extends BaseListComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    // TODO: get Data
  }

  closeDataModal(value: any) {
    if (value) {
      this.getData();
    }
    super.closeDataModal(value);
  }

  async delete(id: number) {
    // TODO: Delete Data
  }

}
