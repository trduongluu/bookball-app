import { Input } from '@angular/core';
import * as uuidv4 from 'uuid/v4';

export abstract class BaseTableEditRowComponent {

  editCache: { [key: string]: { edit: boolean; data: any } } = {};
  @Input() listOfData: any[] = [];
  pageIndex = 1;
  pageSize = 3;
  tempItem: any = {};

  addRow() {
    const item = { ... this.tempItem };
    item.id = this.getRandomId();
    this.editCache[item.id] = {
      edit: false,
      data: { ...item }
    };
    this.listOfData = [...this.listOfData, item];
  }

  deleteRow(id: string) {
    this.listOfData = this.listOfData.filter(x => x.id !== id);
    delete this.editCache[id];
  }

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  saveEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  protected getRandomId() {
    return uuidv4();
  }

}
