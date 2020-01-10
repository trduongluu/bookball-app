import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    console.log('afterviewInit footer')
  }

  constructor() { }

  ngOnInit() {
  }

}
