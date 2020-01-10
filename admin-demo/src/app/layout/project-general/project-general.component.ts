import { Component, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ExtensionService } from '../../_base/services/extension.service';

import { ActivatedRoute, Router } from '@angular/router';

import { Location } from '@angular/common';
import { ProjectGeneralService } from '../../_shared/services/project-general.service';
import { Observable } from 'rxjs';
import { ExtentionTableService } from '../../_base/services/extention-table.service';
import { BaseListComponent } from '../../_base/components/base-list-component';
import { DialogService } from '../../_base/services/dialog.service';
import { StatusService } from '../../_shared/services/status.service';
import { NzMessageService } from 'ng-zorro-antd';
import { ProjectWorkService } from '../../_shared/services/project-work.service';
import { EmployeesService } from '../../_shared/services/employees.service';
@Component({
  selector: 'app-project-general',
  templateUrl: './project-general.component.html',
  styleUrls: ['./project-general.component.scss']
})
export class ProjectGeneralComponent extends BaseListComponent implements OnInit {


  public showDetail: boolean;

  // tslint:disable-next-line: no-output-rename
  @Output('onClick') emitId = new EventEmitter<number>();
  public link: string;


  public myForm: FormGroup;
  // tslint:disable-next-line: variable-name
  public is_save: boolean;
  public id: any = null;
  public tag: any = 'danh-sach-du-an';
  public userData: any;
  // tslint:disable-next-line: variable-name
  public allData: any[] = [];
  public data: any[] = [];
  public listEmployee: any[] = [];
  public initLoad: boolean;
  public paging: any = {
    page: 1,
    size: 15
  };
  // tslint:disable-next-line: variable-name
  public db_ProjGeneral = 'ProjGeneral';
  public proj: any;
  public grProj: any;
  public success = false;

  public listStatus: any[];
  public isView: boolean;
  public sendData: any;
  listOfData: any;

  public isLoad = true;

  constructor(
    private dl: DialogService,
    private ex: ExtensionService,
    private fb: FormBuilder,
    // tslint:disable-next-line: variable-name
    public exTableService: ExtentionTableService,
    private statusSerive: StatusService,
    // tslint:disable-next-line: variable-name
    private employeeService: EmployeesService,
    private ar: ActivatedRoute,
    private rt: Router,

    private location: Location,
    private projService: ProjectGeneralService,
    private message: NzMessageService,
    private projWorkService: ProjectWorkService,
  ) {
    super();
  }

  async ngOnInit() {


    this.link = this.location.path();
    await this.getStatus();
    await this.getEmployee();
    this.createForm();
    await this.getData();








  }

  createForm() {
    this.myForm = this.fb.group({
      searchText: [''],
      searchStatus: [null]
    });
  }



  async getStatus() {
    this.listStatus = [];

    const param = { where: { and: [{ 'data.statusType': 1055 }, { 'dataDb.status': 1 }] } };
    const status = await this.statusSerive.get(param);


    if (status.ok) {
      status.result.data.forEach(item => {
        this.listStatus.push({
          id: item.id,
          name: item.data.statusName
        });
      });
    }
  }

  async deleteDialog(id: number) {
    const result = await this.dl.confirm('<i>Bạn có muốn xóa dữ liệu này không?</i>', '<b> </b>');
    if (result) {
      const rs = await this.projService.delete(id);
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

  async getEmployee() {
    this.listEmployee = [];
    const emp = await this.employeeService.get({});
    console.log('aaaa', emp);

    if (emp.ok) {
      emp.result.data.forEach(item => {
        this.listEmployee.push({
          id: item.id,
          name: item.basic.fullName
        });
      });


    }
  }
  async getData(page = 1) {
    this.data = [];
    this.isLoad = true;
    this.paging.page = page;
    const form = this.myForm.value;
    const where = { and: [] };
    if (form.searchStatus) {
      where.and.push({ statusId: +form.searchStatus });
    }
    if (!!form.searchText) {
      where.and.push(({ or: [{ projCode: { like: form.searchText } }, { projName: { like: form.searchText } }] }));
    }

    // set where
    if (where.and.length > 0) {
      this.paging.where = where;
    } else {
      delete this.paging.where;
    }

    const rs = await this.projService.get(this.paging);
    if (rs.ok) {
      this.data = rs.result.data;
      console.log('dứan', this.data);

      rs.result.data.forEach(async x => {
        var date1 = new Date(x.beginDate);
        var date2 = new Date(x.endDate);
        var Difference_In_Time = date2.getTime() - date1.getTime();
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        x.days = Difference_In_Days;
        this.listEmployee.forEach(h => {

          if (x.pmName === h.id) {
            x.pn = h.name
          }
        });
        if (x.statusId != 1061) {
          x.projPercent = await this.updateProjPercent(x.id);
          if (x.projPercent === 100) {
            x.statusId = 1061;
          }
          const ress = await this.projService.edit(x.id, x);
          x = ress.result;
        }





      });
      this.paging = rs.result.paging;

    }

  }
  setClassPercent(value: number) {
    const className = value > (100 / 3 * 2) ? 'bg-success' : ((value <= (100 / 3)) ? 'bg-danger' : 'bg-orange-300');
    return className;
  }
  async updateProjPercent(id: any) {
    const param = { where: { and: [{ projGeneralId: id }] } };
    const rscv = await this.projWorkService.get(param);

    var tongtren = 0;
    var tongduoi = 0;
    var ketqua = 0;
    rscv.result.data.forEach(x => {
      // tính số ngày của từng công việc
      var date1 = new Date(x.beginDate);
      var date2 = new Date(x.endDate);

      var abc = date2.getTime() - date1.getTime();
      var SoNgay = abc / (1000 * 3600 * 24);

      // tính %cv nhân số ngày cv
      var tonghoanthanh = (x.workCompleted) * SoNgay;


      tongtren += tonghoanthanh;
      tongduoi += SoNgay;
    });
    if (tongduoi != 0) {
      ketqua = (tongtren / tongduoi);
    }

    console.log('etqua', ketqua);

    return (Math.round(ketqua * 100) / 100);

  }

  async deleteChoices() {
    const result = await this.dl.confirm('Bạn có muốn xóa những dữ liệu này không?', ' ');
    if (result) {
      const lstSelected = this.exTableService.getitemSelected(this.data);
      const lstDeleting = [];
      let i = 0;
      for (const item of lstSelected) {
        i++;
        const delObj = await this.projService.delete(item.id);

        lstDeleting.push(delObj);
      }
      await Promise.all(lstDeleting);
      this.exTableService.unselectAll(this.data);
      this.message.success('Xóa dữ liệu thành công');
      const size = (this.data.length - i === 0) ? this.paging.page - 1 : this.paging.page;
      this.getData(size);
    }
  }

}
