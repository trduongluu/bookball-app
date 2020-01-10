import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/_base/services/dialog.service';
import { ExtensionService } from 'src/app/_base/services/extension.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BaseListComponent } from 'src/app/_base/components/base-list-component';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ContractFormService } from 'src/app/_shared/services/contract-form.service';

@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.scss']
})
export class ContractFormComponent extends BaseListComponent implements OnInit {

  public myForm: FormGroup;

  constructor(
    private dl: DialogService,
    private sv: ContractFormService,
    private ex: ExtensionService,
    public exTableService: ExtentionTableService,
    public extentionTableService: ExtentionTableService,
    private fb: FormBuilder,
    private message: NzMessageService
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
    this.paging.page = page;
    const where = { and: [] };
    this.paging.order = order;
    const formSearch = this.myForm.value;

    // create data query where
    if (formSearch.txtSearch) {
      if (!isNaN(+formSearch.txtSearch)) {
        where.and.push({
          or: [
            { 'id': formSearch.txtSearch },
            // { 'data.contractFormName': { like: this.ex.BoDau(formSearch.txtSearch) } }
          ]
        });
      } else {
        where.and.push({
          or: [
            { 'data.contractFormName': { like: this.ex.BoDau(formSearch.txtSearch) } }
          ]
        });
      }
    }

    if (formSearch.status !== null) {
      where.and.push({ 'dataDb.status': formSearch.status });
    } else {
      where.and.push({ or: [{ 'dataDb.status': 0 }, { 'dataDb.status': 1 }] });
    }
    if (where.and.length > 0) { this.paging.where = where; }

    this.isLoading = true;
    const rs = await this.sv.get(this.paging);
    this.isLoading = false;

    this.ex.logDebug('getData', rs);
    if (rs.ok) {
      this.listOfData = rs.result.data;
      this.listOfData.forEach(x => {
        x.isHidden = x.dataDb.status === 1;
        x.toggle = 'close-text';
      });
      this.paging = rs.result.paging;
    }
    this.refreshStatus();
  }

  async deleteDialog(item: any) {
    console.log('delete id', item.id);
    const result = await this.dl.confirm('<i>Bạn có muốn xóa dữ liệu này không?</i>', '<b> </b>');
    if (result) {
      const rs = await this.sv.delete(item.id);
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
    this.message.success("Xóa dữ liệu thành công");
  }

}
