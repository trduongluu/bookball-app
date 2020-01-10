import { Component, OnInit } from '@angular/core';
import { PackageBidsService } from 'src/app/_shared/services/package-bids.service';
import { DialogService } from 'src/app/_base/services/dialog.service';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { NzMessageService } from 'ng-zorro-antd';
import { ExtensionService } from 'src/app/_base/services/extension.service';
import { FormBuilder } from '@angular/forms';
import { BaseListComponent } from 'src/app/_base/components/base-list-component';
import { StatusService } from 'src/app/_shared/services/status.service';

@Component({
  selector: 'app-package-bids',
  templateUrl: './package-bids.component.html',
  styleUrls: ['./package-bids.component.scss']
})
export class PackageBidsComponent extends BaseListComponent implements OnInit {

  public data: any[] = [];
  public paging: any = {
    page: 1,
    size: 15
  };
  public isLoad = true;
  public isView: boolean;
  public link;
  public listStatus: any[];
  public sendData: any;
  public projGeneralId: number;
  public item: any;
  public name = 'gói thầu';
  constructor(
    public packageBidsServices: PackageBidsService,
    public statusService: StatusService,
    private dl: DialogService,
    public exTable: ExtentionTableService,
    private message: NzMessageService,
    private ex: ExtensionService,
    private fb: FormBuilder, ) {
    super();
  }

  async ngOnInit() {
    this.getStatus();
    this.creatForm();
    await this.getData();
  }

  creatForm() {
    this.myForm = this.fb.group({
      searchText: [''],
      searchStatus: [null]
    });
  }

  async getStatus() {
    this.listStatus = [];
    const rs = await this.statusService.get({ where: { 'data.statusType': 26 }, order: '[{\"id\": true}]' });
    if (rs.ok) {
      rs.result.data.forEach(x => {
        this.listStatus.push({
          id: x.id,
          name: x.data.statusName
        });
      });
    }
  }

  async getData(page = 1) {
    this.data = [];
    this.isLoad = true;
    this.paging.page = page;
    this.paging.order = '[{\"projId\": false}]';
    const form = this.myForm.value;
    const where = { and: [] };
    // tìm kiếm theo trạng thái
    if (form.searchStatus) {
      where.and.push({ statusId: +form.searchStatus });
    }
    // tìm kiếm theo tên hoặc mã
    if (form.searchText) {
      where.and.push((!isNaN(+form.searchText)) ?
        { or: [{ id: +form.searchText }, { packageBidName: { like: this.ex.BoDau(form.searchText) } }] } :
        { packageBidName: { like: this.ex.BoDau(form.searchText) } });
    }

    // set where
    if (where.and.length > 0) {
      this.paging.where = where;
    } else {
      delete this.paging.where;
    }
    const rs = await this.packageBidsServices.get(this.paging);
    if (rs.ok) {
      this.listOfData = rs.result.data;
      this.paging = rs.result.paging;
      rs.result.data.forEach(x => {
        if (x.proj) {
          const item = {
            projId: x.projId,
            projName: x.proj.projName,
            isShow: true,
            PackageBids: [x],
            totalestimatedPrice: x.estimatedPrice ? x.estimatedPrice * x.exchangeRate : 0,
            totalbidPrice: x.bidPrice ? x.bidPrice * x.exchangeRate : 0,
            totalbestBid: x.bestBid ? x.bestBid * x.exchangeRate : 0,
            totalcontractPrice: x.contractPrice ? x.contractPrice * x.exchangeRate : 0
          };
          const index = this.data.findIndex(i => i.projId === x.projId);
          if (index === -1) {
            this.data.push(item);
          } else {
            this.data[index].totalestimatedPrice += x.estimatedPrice ? x.estimatedPrice * x.exchangeRate : 0;
            this.data[index].totalbidPrice += x.bidPrice ? x.bidPrice * x.exchangeRate : 0;
            this.data[index].totalbestBid += x.bestBid ? x.bestBid * x.exchangeRate : 0;
            this.data[index].totalcontractPrice += x.contractPrice ? x.contractPrice * x.exchangeRate : 0;
            this.data[index].PackageBids.push(x);
          }
        }
      });
    }
    console.log('Getdata', this.data);
    this.isLoad = false;
  }



  async deleteChoices() {
    const result = await this.dl.confirm('Bạn có muốn xóa những dữ liệu này không?', 'Some descriptions');
    if (result) {
      const lstSelected = this.exTable.getitemSelected(this.listOfData);
      const lstDeleting = [];
      for (const item of lstSelected) {
        const delObj = await this.packageBidsServices.delete(item.id);
        lstDeleting.push(delObj);
      }
      await Promise.all(lstDeleting);
      this.exTable.unselectAll(this.listOfData);
      this.message.success('Xóa dữ liệu thành công');
      this.getData();
    }
  }

  async deleteDialog(id: number) {
    const result = await this.dl.confirm('<i>Bạn có muốn xóa dữ liệu này không?</i>', '<b>Some descriptions</b>');
    if (result) {
      const rs = await this.packageBidsServices.delete(id);
      this.ex.logDebug('Delete response', rs);
      if (rs.ok) {
        this.getData(this.paging.page);
        this.message.success('Xóa dữ liệu thành công');
      }
    }
  }

  openModal(item = null, isView = false) {
    this.item = item;
    this.id = item ? item.id : null;
    this.projGeneralId = item ? item.projId : null;
    this.isView = isView;
    this.isShowModalData = true;
  }

  closeDataModal(value: any) {
    if (!!value) {
      this.getData(this.paging.page);
    }
    super.closeDataModal(value);
  }

  addData(value: any) {
    if (!!value) {
      this.getData(this.paging.page);
    }
  }

  async updateStatus(item: any, allowDisplay: number) {
    const changeVal = 1 - allowDisplay;
    const rs = await this.packageBidsServices.patch(item.id, { allowDisplay: changeVal });
    if (rs.ok) {
      item.allowDisplay = changeVal;
    } else {
      this.dl.error('Lỗi hệ thống', 'Dữ liệu của bạn không cập nhật thành công do lỗi hệ thống');
    }
  }

}
