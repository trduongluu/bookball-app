import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/_base/services/dialog.service';
import { ExtensionService } from 'src/app/_base/services/extension.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BaseListComponent } from 'src/app/_base/components/base-list-component';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { StatusService } from 'src/app/_shared/services/status.service';
import { ScrollService } from 'src/app/_base/services/scroll.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
  providers: [ScrollService]
})
export class StatusComponent extends BaseListComponent implements OnInit {

  public myForm: FormGroup;
  public isShowParent = false;

  constructor(
    private dl: DialogService,
    private sv: StatusService,
    private ex: ExtensionService,
    public exTableService: ExtentionTableService,
    public extentionTableService: ExtentionTableService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private scrollService: ScrollService
  ) {
    super();
  }

  async ngOnInit() {
    this.createForm();
    this.getData();
  }

  createForm() {
    this.myForm = this.fb.group({
      txtSearch: [''],
      status: [null]
    });
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

  async getData(page: number = 1, order: any[] = [{ id: false }]) {
    this.scrollService.scrollToTop();
    this.paging.page = page;
    const where: any = { and: [{ 'data.statusType': 0 }] };
    this.paging.order = order;
    const formSearch = this.myForm.value;

    // create data query where
    if (formSearch.txtSearch) {
      where.and.push(
        { 'data.statusName': { like: this.ex.BoDau(formSearch.txtSearch) } }
      );
    }

    if (formSearch.status !== null) {
      where.and.push({ 'dataDb.status': formSearch.status });
    } else {
      where.and.push({ or: [{ 'dataDb.status': 0 }, { 'dataDb.status': 1 }] });
    }
    if (where.and.length > 0) { this.paging.where = where; }

    this.isLoading = true;
    // tslint:disable-next-line: max-line-length
    const rs = await this.sv.get(this.paging);
    this.isLoading = false;

    this.ex.logDebug('getData', rs);
    if (rs.ok) {
      this.listOfData = rs.result.data;
      this.listOfData.forEach(x => {
        x.child = [];
        x.level = 1;
        x.isHidden = x.dataDb.status === 1;
        x.toggle = 'close-text';
      });
      this.paging = rs.result.paging;
    }
    this.refreshStatus();
  }

  async deleteDialog(id: number) {
    console.log('delete id', id);
    const result = await this.dl.confirm('<i>Bạn có muốn xóa dữ liệu này không?</i>', '<b> </b>');
    if (result) {
      const rs = await this.sv.delete(id);
      this.ex.logDebug('Delete response', rs);
      if (rs.ok) {
        this.getData(this.paging.page);
        this.deleteMessage();
      }
    }
  }

  async deleteMulti() {
    let result: boolean;
    if (this.listIdCheckedNumber[1]) {
      result = await this.dl.confirm('Bạn có muốn xóa những dữ liệu này không?', ' ');
    } else {
      result = await this.dl.confirm('Bạn có muốn xóa dữ liệu này không?', ' ');
    }
    if (result) {
      const tasks = this.listIdCheckedNumber.map(x => this.sv.delete(x));
      await Promise.all(tasks);
      this.deleteMessage();
      this.getData();
    }
  }


  async updateStatus(item: any, status: number) {
    const changeVal = 1 - status;
    const rs = await this.sv.patch(item.id, { dataDb: { status: changeVal } });
    if (rs.ok) {
      item.dataDb.status = changeVal;
      item.isHidden = !!!item.isHidden;
    } else {
      this.dl.error('Lỗi hệ thống', 'Dữ liệu của bạn không cập nhật thành công do lỗi hệ thống');
    }
  }

  deleteMessage() {
    this.message.success('Xóa dữ liệu thành công');
  }

  checkShowParent() {
    for (const x of this.listOfData) {
      if (x.child[0]) {
        this.isShowParent = true;
        break;
      }
      if (x === this.listOfData[this.listOfData.length - 1] && this.isShowParent && !x.child[0]) {
        this.isShowParent = false;
      }
    }
  }

  async loadChild(item: any) {
    if (item.child) {
      item.child.length = 0;
    }
    this.checkShowParent();
    item.show = !item.show;
    if (item.show) {
      const formSearch = this.myForm.value;
      const where: any = { and: [{ 'data.statusType': item.id }] };

      if (formSearch.status !== null) {
        where.and.push({ 'dataDb.status': formSearch.status });
      } else {
        where.and.push({ or: [{ 'dataDb.status': 0 }, { 'dataDb.status': 1 }] });
      }
      const rs = await this.sv.get({ page: 1, size: 100, where });
      this.ex.logDebug('loadChild', rs);
      if (rs.ok) {
        if (JSON.stringify(rs.result.data) !== '[]') {
          for (const itemChild of rs.result.data) {
            itemChild.child = [];
            itemChild.level = item.level + 1;
            itemChild.isHidden = itemChild.dataDb.status === 0;
          }
          item.child = rs.result.data;
          this.isShowParent = true;
          console.log(`child level ${item.level + 1}`, item.child);
        } else {
          this.message.warning(`${item.data.statusName} không có trạng thái con nào`);
        }
      }
    }
  }

}
