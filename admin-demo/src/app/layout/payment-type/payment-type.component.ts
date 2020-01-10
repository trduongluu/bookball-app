import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/_base/components/base-list-component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DialogService } from 'src/app/_base/services/dialog.service';
import { ExtensionService } from 'src/app/_base/services/extension.service';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { NzMessageService } from 'ng-zorro-antd';
import { PaymentTypeService } from 'src/app/_shared/services/payment-type.service';

@Component({
  selector: 'app-payment-type',
  templateUrl: './payment-type.component.html',
  styleUrls: ['./payment-type.component.scss']
})
export class PaymentTypeComponent extends BaseListComponent implements OnInit {

  public myForm: FormGroup;
  constructor(
    private dialogService: DialogService,
    private paymentTypeService: PaymentTypeService,
    private ex: ExtensionService,
    public exTable: ExtentionTableService,
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

  deleteMessage() {
    this.message.success('Xóa dữ liệu thành công');
  }

  async getData(page: number = 1, order: any[] = [{ id: false }]) {
    this.paging.page = page;
    const where = { and: [] };
    this.paging.order = order;
    const formSearch = this.myForm.value;

    // create data query where
    if (formSearch.txtSearch) {
      where.and.push({
        or: [
          { 'data.paymentTypeName': { like: this.ex.BoDau(formSearch.txtSearch) } },
        ]
      });
    }
    if (formSearch.status !== null) {
      where.and.push({ 'dataDb.status': formSearch.status });
    } else {
      where.and.push({ or: [{ 'dataDb.status': 0 }, { 'dataDb.status': 1 }] });
    }
    if (where.and.length > 0) { this.paging.where = where; }

    this.isLoading = true;
    this.exTable.start(this.listOfData);
    const rs = await this.paymentTypeService.get(this.paging);
    this.isLoading = false;
    this.ex.logDebug('getData', rs);
    if (rs.ok) {
      this.listOfData = rs.result.data;
      this.listOfData.forEach(x => x.isHidden = x.dataDb.status);
      this.paging = rs.result.paging;
      this.exTable.end(this.listOfData);
    }
  }

  closeDataModal(value: any) {
    if (value) {
      this.getData(this.paging.page);
    }
    super.closeDataModal(value);
  }

  addData(value: any) {
    if (!!value) {
      this.getData(this.paging.page);
    }
  }


  async deleteDialog(item: any) {
    console.log('delete id', item.id);
    const result = await this.dialogService.confirm('Bạn có muốn xóa dữ liệu này không?', 'Some descriptions');
    if (result) {
      const rs = await this.paymentTypeService.delete(item.id);
      this.ex.logDebug('Delete response', rs);
      if (rs.ok) {
        this.getData(this.paging.page);
        this.deleteMessage();
      }
    }
  }

  async deleteMulti() {
    const result = await this.dialogService.confirm('Bạn có muốn xóa những dữ liệu này không?', 'Some descriptions');
    if (result) {
      const tasks = this.listIdCheckedNumber.map(x => this.paymentTypeService.delete(x));
      await Promise.all(tasks);
      this.listIdCheckedNumber.forEach(x => delete this.mapOfCheckedId[x]);
      this.isAllDisplayDataChecked = false;
      this.isIndeterminate = false;
      this.deleteMessage();
      this.getData();
    }
  }

  async updateStatus(item: any, status: number) {
    const changeVal = 1 - status;
    const rs = await this.paymentTypeService.patch(item.id, { dataDb: { status: changeVal } });
    if (rs.ok) {
      item.dataDb.status = changeVal;
      item.isHidden = !!!item.isHidden;
    } else {
      this.dialogService.error('Lỗi hệ thống', 'Dữ liệu của bạn không cập nhật thành công do lỗi hệ thống');
    }
  }
}