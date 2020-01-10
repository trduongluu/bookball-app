import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/_base/services/dialog.service';
import { ExtensionService } from 'src/app/_base/services/extension.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BaseListComponent } from 'src/app/_base/components/base-list-component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProductServicesService } from 'src/app/_shared/services/product-services.service';

@Component({
  selector: 'app-product-services',
  templateUrl: './product-services.component.html',
  styleUrls: ['./product-services.component.scss']
})
export class ProductServicesComponent extends BaseListComponent implements OnInit {
  public myForm: FormGroup;
  public lsType: any[] = [
    { id: 1, name: 'Sản phẩm' },
    { id: 2, name: 'Dịch vụ' }
  ];
  constructor(
    private dl: DialogService,
    private sv: ProductServicesService,
    private ex: ExtensionService,
    private fb: FormBuilder,
    private message: NzMessageService) {
    super();
  }


  async ngOnInit() {
    this.createForm();
    this.getData();
  }

  createForm() {
    this.myForm = this.fb.group({
      txtSearch: [''],
      prodServ: [null],
      status: [null],
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
            { 'data.prodServCode': formSearch.txtSearch }
          ]
        });
      } else {
        where.and.push({
          or: [
            { 'data.prodServCode': { like: this.ex.BoDau(formSearch.txtSearch) } },
            { 'data.prodServNameVN': { like: this.ex.BoDau(formSearch.txtSearch) } }
          ]
        });
      }
    }

    if (formSearch.prodServ) {
      where.and.push({ 'data.prodServ': formSearch.prodServ });
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
        const typeData = this.lsType.find(a => a.id === x.data.prodServ);
        if (typeData) {
          x.data.prodServName = typeData.name;
        }
      });
      this.paging = rs.result.paging;
    }
    this.refreshStatus();
  }

  async deleteDialog(item: any) {
    console.log('delete id', item.id);
    const result = await this.dl.confirm('Bạn có muốn xóa dữ liệu này không?', ' ');
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
    this.message.success('Xóa dữ liệu thành công');
  }
}
