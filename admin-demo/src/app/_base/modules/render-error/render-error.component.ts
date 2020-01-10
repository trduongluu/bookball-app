import { FormControl } from '@angular/forms';
import { Component, OnInit, Input, OnChanges, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'render-error',
  templateUrl: './render-error.component.html',
  styleUrls: ['./render-error.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RenderErrorComponent implements OnInit, OnChanges {
  // tslint:disable-next-line:no-input-rename
  @Input('data') myControl: FormControl;
  @Input() className = '';
  ngClass: any = {};
  constructor(
  ) { }

  ngOnInit() {
    this.changeToArray(this.myControl);
    this.ngClass[this.className] = this.className ? true : false;
  }

  ngOnChanges() {
    // console.log(this.myControl.errors);
  }

  // tslint:disable-next-line:member-ordering
  public lstError = [];
  // tslint:disable-next-line:member-ordering
  public error = {};
  changeToArray(obj: any) {
    if (obj == null) { return; }
    if (obj.errors == this.error) {
      return this.lstError;
    }

    this.lstError = [];
    this.error = obj.errors;
    if (obj.errors != null) {
      this.lstError = [];
      for (const key in obj.errors) {
        const jsonData = `{"key":"${key}","value": "${obj.errors[key]}"}`;
        const data = JSON.parse(jsonData);
        this.lstError.push(data);
      }
    }
    return this.lstError;
  }
}
