import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/_base/components/base-list-component';

@Component({
  selector: 'app-expected-costs',
  templateUrl: './expected-costs.component.html',
  styleUrls: ['./expected-costs.component.scss']
})
export class ExpectedCostsComponent extends BaseListComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
