import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pitchs',
  templateUrl: './pitchs.component.html',
  styleUrls: ['./pitchs.component.scss']
})
export class PitchsComponent implements OnInit {

  loading = false;
  selectedValue = null;

  constructor() { }

  ngOnInit() {
  }

}