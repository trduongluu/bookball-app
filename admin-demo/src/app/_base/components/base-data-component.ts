import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseFormComponent } from './base-form-component';
import { Input, Output, EventEmitter } from '@angular/core';
import { tap } from 'rxjs/operators';

export abstract class BaseDataComponent<T = any> extends BaseFormComponent {

  data: T;
  public defauteSize = 500; // đang sử dụng cho phần tài liệu
  public listCurrency = [{
    id: 'VND',
    name: 'VND'
  }, {
    id: 'USD',
    name: 'USD'
  }, {
    id: 'EUR',
    name: 'EUR'
  }, {
    id: 'JP',
    name: 'JP'
  }, {
    id: 'GBP',
    name: 'GBP'
  }];
  tapStopLoading = tap<T>(this.stopLoading, this.stopLoading);
  @Input() id: number | string;
  @Input() isView: boolean;
  @Output() cusOnClose = new EventEmitter<T | null>();
  @Output() onAddData = new EventEmitter<T | null>();

  constructor(
    fb: FormBuilder
  ) {
    super(fb);
  }

  handleCancel() {
    this.cusOnClose.emit(null);
  }

  handleOk(data: any = null) {
    this.cusOnClose.emit(data);
  }

  handleAdd(data: any = null) {
    this.onAddData.emit(data);
  }
}
