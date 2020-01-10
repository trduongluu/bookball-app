import { Component, OnInit } from '@angular/core';
import { HandoverScheduleService } from 'src/app/_shared/services/handover-schedule.service';
import { DialogService } from 'src/app/_base/services/dialog.service';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { NzMessageService } from 'ng-zorro-antd';
import { ExtensionService } from 'src/app/_base/services/extension.service';
import { FormBuilder } from '@angular/forms';
import { BaseListComponent } from 'src/app/_base/components/base-list-component';
import { StatusService } from 'src/app/_shared/services/status.service';

@Component({
  selector: 'app-handover-schedule',
  templateUrl: './handover-schedule.component.html',
  styleUrls: ['./handover-schedule.component.scss']
})
export class HandoverScheduleComponent extends BaseListComponent implements OnInit {

  public data: any[] = [];
  public paging: any = {
    page: 1,
    size: 10
  };
  public isLoad = true;
  public isView: boolean;
  public listStatus: any[];
  public sendData: any;
  public projectId: number;
  public contratId: number;
  public handoverId: number;
  public item: any;
  public name = 'tiến độ bàn giao';
  constructor(
    public handoverScheduleService: HandoverScheduleService,
    public statusService: StatusService,
    private dl: DialogService,
    public exTableService: ExtentionTableService,
    private message: NzMessageService,
    private ex: ExtensionService,
    private fb: FormBuilder) {
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
    })
  }

  async getStatus() {
    this.listStatus = [];
    const rs = await this.statusService.get({ where: { 'data.statusType': 1040 }, order: '[{\"id\": true}]' });
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
    this.paging.order = '[{\"contractsId\": true}]';
    const form = this.myForm.value;
    const where = { and: [] };
    // tìm kiếm theo trạng thái
    if (form.searchStatus) {
      where.and.push({ statusId: +form.searchStatus });
      console.log(+form.searchStatus);

    }
    // tìm kiếm theo tên hoặc mã
    if (form.searchText) {
      // tslint:disable-next-line: max-line-length
      where.and.push({ 'contracts.contractName': { like: this.ex.BoDau(form.searchText) } });
    }
    // set where
    if (where.and.length > 0) {
      this.paging.where = where;
    } else {
      delete this.paging.where;
    }
    const rs = await this.handoverScheduleService.get(this.paging);
    if (rs.ok) {
      this.listOfData = rs.result.data;
      this.paging = rs.result.paging;
      rs.result.data.forEach(x => {
        if (x.proj) {
          const item = {
            projId: x.projId,
            projName: x.proj.projName,
            isShow: true,
            handoverSchedule: [x]
          };
          const index = this.data.findIndex(i => i.projId === x.projId);
          index === -1 ? this.data.push(item) : this.data[index].handoverSchedule.push(x);
        }
      });
    }
    this.isLoad = false;
  }

  openModal(item: any, isView: boolean, projectId: number = null, contratId: number = null, handoverId: number = null, id: number = null) {
    this.projectId = projectId;
    this.contratId = contratId;
    this.handoverId = handoverId;
    this.item = item;
    this.openDataModal(id, isView);
  }


  async deleteChoices() {
    const result = await this.dl.confirm('Bạn có muốn xóa những dữ liệu này không?', 'Some descriptions');
    if (result) {
      const lstSelected = this.exTableService.getitemSelected(this.listOfData);
      const lstDeleting = [];
      for (const item of lstSelected) {
        const delObj = await this.handoverScheduleService.delete(item.id);
        lstDeleting.push(delObj);
      }
      await Promise.all(lstDeleting);
      this.exTableService.unselectAll(this.listOfData);
      this.message.success('Xóa dữ liệu thành công');
      this.getData();
    }
  }

  async deleteDialog(id: number) {
    const result = await this.dl.confirm('<i>Bạn có muốn xóa dữ liệu này không?</i>', '<b>Some descriptions</b>');
    if (result) {
      const rs = await this.handoverScheduleService.delete(id);
      this.ex.logDebug('Delete response', rs);
      if (rs.ok) {
        this.getData(this.paging.page);
        this.message.success('Xóa dữ liệu thành công');
      }
    }
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
    const rs = await this.handoverScheduleService.patch(item.id, { allowDisplay: changeVal });
    if (rs.ok) {
      item.allowDisplay = changeVal;
    } else {
      this.dl.error('Lỗi hệ thống', 'Dữ liệu của bạn không cập nhật thành công do lỗi hệ thống');
    }
  }
}
