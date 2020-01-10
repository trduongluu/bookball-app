import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/_base/services/dialog.service';
import { ExtensionService } from 'src/app/_base/services/extension.service';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { BaseListComponent } from 'src/app/_base/components/base-list-component';
import { TemplateService } from 'src/app/_shared/services/template.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent extends BaseListComponent implements OnInit {
  public myForm: FormGroup;
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
    this.paging.page = page;
    const where = { and: [] };
    this.paging.order = order;
    const formSearch = this.myForm.value;

    // create data query where
    if (formSearch.txtSearch) {
      where.and.push({ 'data.name': { like: formSearch.txtSearch } });
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
    const result = await this.dl.confirm('Bạn có muốn xóa dữ liệu này không?', ' ');
    if (result) {
      const rs = await this.sv.delete(item.id);
      this.ex.logDebug('Delete response', rs);
      if (rs.ok) {
        this.getData(this.paging.page);
      }
    }
  }

  async deleteChoices() {
    const result = await this.dl.confirm('Bạn có muốn xóa những dữ liệu này không?', ' ');
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
