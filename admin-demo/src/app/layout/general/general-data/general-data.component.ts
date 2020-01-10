import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-general-data',
  templateUrl: './general-data.component.html',
  styleUrls: ['./general-data.component.scss']
})
export class GeneralDataComponent implements OnInit {

  @Input('params') params: any;
  @Input('template') template: NgTemplateOutlet;
  @Input('setting') setting: any;
  @Output('nzOnOk') nzOnOk = new EventEmitter<any>();
  @Output('nzOnCancel') nzOnCancel = new EventEmitter<void>();
  isDialogLoading: boolean = false;
  constructor() { }

  ngOnInit() {
    if (this.params.mode === 1) {
      //view
    }
  }

  handleCancel() {
    this.nzOnCancel.emit();
  }

  handleOk() {
    this.isDialogLoading = true;
    setTimeout(() => {
      this.nzOnOk.emit(null);
    }, 3000);
  }

}
