import { PagingModel } from '../models/response-model';
import { FormGroup } from '@angular/forms';

export abstract class BaseListComponent<T = any> {

  isShowModalData = false;
  listOfData: T[] = [];
  id: number | string;
  isView: boolean;
  isLoading = false;
  paging: PagingModel = {
    page: 1,
    size: 100
  };
  myForm: FormGroup;
  lstStatus = [
    { id: 0, name: 'Ẩn' },
    { id: 1, name: 'Hiện' }
  ];
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  mapOfCheckedId: { [key: string]: boolean } = {};

  constructor() { }

  openDataModal(id: number | string = null, isView = false) {
    this.isView = isView;
    this.id = id;
    this.isShowModalData = true;
  }

  closeDataModal(value: T) {
    this.id = null;
    this.isShowModalData = false;
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = !!this.listOfData.length && this.listOfData.every(item => this.mapOfCheckedId[(item as any).id]);
    this.isIndeterminate =
      this.listOfData.some(item => this.mapOfCheckedId[(item as any).id]) && !this.isAllDisplayDataChecked;
  }

  checkAll(value: boolean): void {
    this.listOfData.forEach(item => (this.mapOfCheckedId[(item as any).id] = value));
    this.refreshStatus();
  }

  deleteMulti() {

  }

  get listIdChecked() {
    return Object.keys(this.mapOfCheckedId).filter(x => !!this.mapOfCheckedId[x]);
  }

  get listIdCheckedNumber() {
    return this.listIdChecked.map(x => +x);
  }

  handleToggle(item: any) {
    if (item.toggle === 'close-text') {
      item.toggle = 'open-text';
    } else {
      item.toggle = 'close-text';
    }
  }
}
