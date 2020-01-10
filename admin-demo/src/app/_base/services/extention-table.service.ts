import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExtentionTableService {

  private data: any[] = [];
  constructor() { }

  public end(source: any[], itemSelected: any[] = []) {
    //add list default
    itemSelected.forEach(x => {
      const index = this.data.findIndex(d => d.id + '' === x.id + '');
      if (index === -1) {
        this.data.push({
          id: x.id,
          selected: true
        });
      }
    });

    source.forEach(x => {
      const index = this.data.findIndex(d => d.id + '' === x.id + '');
      if (index === -1) {
        this.data.push(x);
      } else {
        x.selected = this.data[index].selected;
        this.data[index] = x;
      }
    });
  }

  //save
  public start(source: any[]) {
    source.forEach(x => {
      const index = this.data.findIndex(d => d.id + '' === x.id + '');
      if (index === -1) {
        this.data.push(x);
      } else {
        this.data[index] = x;
      }
    });
  }

  public reset() {
    this.data = [];
  }

  public selectAll(source: any[]) {
    source.forEach(x => {
      if (x.disable !== true) {
        x.selected = true;
      }
    })
  }

  public selectAllData(source: any[]) {
    source.forEach(x => {
      const index = this.data.findIndex(d => d.id + '' === x.id + '');
      if (index === -1) {
        this.data.push({
          id: x.id,
          selected: true
        });
      } else {
        this.data[index].selected = true;
      }
    });
  }

  public unselectAll(source: any[]) {
    source.forEach(x => {
      x.selected = false;
    })
  }

  public getitemSelected(source: any[] = null) {
    if (source !== null) {
      //get item selected form source
      return source.filter(x => x.selected === true);
    } else {
      //get item selected from all page
      return this.data.filter(x => x.selected === true);
    }
  }

  public getitemUnSelected(source: any[] = null) {
    if (source !== null) {
      //get item unselected form source
      return source.filter(x => x.selected !== true);
    } else {
      //get item unselected from all page
      return this.data.filter(x => x.selected !== true);
    }
  }

  public isSelectAll(source: any[]) {
    let isSelect = source.length > 0 ? true : false;
    for (let index = 0; index < source.length; index++) {
      const item = source[index];
      if (item.selected !== true) {
        isSelect = false;
        break;
      }
    }
    return isSelect;
  }

  public changeSelected(checked: boolean, source: any[]) {
    if (checked) {
      this.selectAll(source);
    } else {
      this.unselectAll(source);
    }
  }

  public changeSelectedAnt(event, source: any[]) {
    const checked = event;
    if (checked) {
      this.selectAll(source);
    } else {
      this.unselectAll(source);
    }
  }
}
