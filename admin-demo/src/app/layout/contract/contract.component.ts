import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/_base/components/base-list-component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DialogService } from 'src/app/_base/services/dialog.service';
import { TemplateService } from 'src/app/_shared/services/template.service';
import { ExtensionService } from 'src/app/_base/services/extension.service';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent extends BaseListComponent implements OnInit {
  public myForm: FormGroup;
  public lstOffice: any[] = [
    {
      id: 1, name: 'Trung tâm phần mềm'
    },
    {
      id: 2, name: 'Phòng kinh doanh'
    },
    {
      id: 3, name: 'Phòng hành chính'
    },
    {
      id: 4, name: 'Phòng nhân sự'
    }
  ];
  public lstType: any[] = [
    {
      id: 1, name: 'Hợp đồng lao động'
    },
    {
      id: 2, name: 'Hợp đồng vô thời hạn'
    },
    {
      id: 3, name: 'Hợp đồng thử việc'
    }
  ];
  constructor(
    private dl: DialogService,
    private sv: TemplateService,
    private ex: ExtensionService,
    public exTableService: ExtentionTableService,
    private fb: FormBuilder
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

  async getData(page: number = 1, order: any[] = [{ id: false }]) {
    this.listOfData = [{ id: 1 }];
    return;
    this.paging.page = page;
    const where = { and: [] };
    this.paging.order = order;
    const formSearch = this.myForm.value;

    // create data query where
    if (formSearch.txtSearch) {
      where.and.push({ 'data.name': { like: this.ex.BoDau(formSearch.txtSearch) } });
    }
    if (formSearch.status) {
      where.and.push({ 'dataDb.status': formSearch.status });
    } else {
      where.and.push({ or: [{ 'dataDb.status': 0 }, { 'dataDb.status': 1 }] });
    }
    if (where.and.length > 0) { this.paging.where = where; }

    this.isLoading = true;
    this.exTableService.start(this.listOfData);
    const rs = await this.sv.get(this.paging);
    this.ex.logDebug('getData', rs);
    this.isLoading = false;
    this.ex.logDebug('getData', rs);
    if (rs.ok) {
      this.listOfData = rs.result.data;
      this.paging = rs.result.paging;
      this.exTableService.end(this.listOfData);
    }
  }

  async deleteDialog(item: any) {
    console.log('delete id', item.id);
    const result = await this.dl.confirm('Bạn có muốn xóa dữ liệu này không?', 'xóa dữ liệu có thể sẽ xóa tất cả cácc dữ liệu liên quan');
    if (result) {
      const rs = await this.sv.delete(item.id);
      this.ex.logDebug('Delete response', rs);
      if (rs.ok) {
        this.getData(this.paging.page);
      }
    }
  }

  async deleteChoices() {
    const result = await this.dl.confirm('Bạn có muốn xóa những dữ liệu này không?', 'xóa dữ liệu có thể sẽ xóa tất cả cácc dữ liệu liên quan');
    if (result) {
      const lstSelected = this.exTableService.getitemSelected(this.listOfData);
      const lstDeleting = [];
      for (const item of lstSelected) {
        const delObj = await this.sv.delete(item.id);
        lstDeleting.push(delObj);
      }
      await Promise.all(lstDeleting);
      this.exTableService.unselectAll(this.listOfData);
      this.getData();
    }
  }

  async updateStatus(id: any, status: number) {
    const changeVal = 1 - status;
    const rs = await this.sv.patch(id, { dataDb: { status: changeVal } });
    if (rs.ok) {
      const item = this.listOfData.find(x => x.id === id);
      if (item) {
        item.dataDb.status = changeVal;
      }
    } else {
      this.dl.error('Lỗi hệ thống', 'Dữ liệu của bạn không cập nhật thành công do lỗi hệ thống');
    }
  }

}

