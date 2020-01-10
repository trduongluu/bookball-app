import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/_base/services/dialog.service';
import { ExtensionService } from 'src/app/_base/services/extension.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  setting: any;
  paging: any = {
    page: 1,
    count: 100,
    totalPage: 50,
    size: 20
  }
  showDialog: boolean = false;
  paramsDialog: any = {};
  isDialogLoading: boolean = false;
  constructor(
    private dl: DialogService,
    private ex: ExtensionService
  ) { }

  ngOnInit() {
    this.getSetting();
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit home');
  }

  async getSetting() {
    // let rs = await this.sv.Setting('template');
    // this.ex.logDebug('getSetting', rs);
    // if (rs.success) {
    //   this.setting = rs.data;
    // }
  }

  addDialog() {
    this.paramsDialog.mode = 1;
    this.paramsDialog.id = null;
    this.showDialog = true;
  }

  editDialog(item: any) {
    this.paramsDialog.mode = 2;
    this.paramsDialog.id = item.id;
    this.showDialog = true;
  }

  viewDialog(item: any) {
    this.paramsDialog.mode = 3;
    this.paramsDialog.id = item.id;
    this.showDialog = true;
  }

  async deleteDialog(item: any) {
    let result = await this.dl.confirm('<i>Do you Want to delete these items?</i>', '<b> </b>');
    if (!result) return;
  }

  closeDialog(): void {
    this.showDialog = false;
  }

  submitDialog(data): void {
    this.showDialog = false;
  }

}
