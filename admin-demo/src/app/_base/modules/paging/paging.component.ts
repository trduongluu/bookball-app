import { PlatformLocation } from '@angular/common';
import { Component, OnChanges, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss']
})
export class PagingComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() view = 5;
  @Input() loading: boolean;
  @Input() temp: number;
  @Input() item: any[] = [];
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onChange = new EventEmitter<number>();

  lstPage: number[] = [];
  curentPage = 1;
  totalPage = 0;
  totalItem = 0;
  itemsPerPage = 10;

  constructor(private location: PlatformLocation) { }

  ngOnInit(): void {
    // fix back browse load data page
    this.location.onPopState(() => {
      const page = 1; // this.ex.getUrlParameter('page');
      if (page != null) {
        this.onChange.emit(page);
      }
    });
  }

  ngOnChanges() {
    this.lstPage = [];
    if (this.data == null) { return; }
    this.curentPage = this.data.page;
    this.totalPage = this.data.totalPage;
    this.totalItem = this.data.count;
    this.itemsPerPage = this.data.size;

    if (this.totalPage > 1) {
      let showItem = this.view;
      if (this.totalPage < this.view) { showItem = this.totalPage; }
      // index slot curent page
      let index = this.curentPage;
      if (showItem == this.view) {
        index = showItem % 2 == 0 ? (showItem / 2) : parseInt((showItem / 2).toString()) + 1;
      }

      let fix = this.curentPage < index ? (index - this.curentPage) : 0;
      if (this.curentPage > (this.totalPage - index) && showItem == this.view) { fix = (this.totalPage - index) - this.curentPage + 1; }
      for (let i = 1; i <= showItem; i++) {
        this.lstPage.push(this.curentPage - index + i + fix);
      }
    }
  }

  onChangePage(page: number) {
    if (page < 1) { return; }
    if (page > this.totalPage) { return; }
    this.onChange.emit(page);
  }

  onChangeInput(page: number) {
    if (page < 1) {
      this.curentPage = 1;
      return;
    }
    if (page > this.totalPage) {
      this.curentPage = this.totalPage;
      return;
    }
    this.onChange.emit(page);
  }
}
