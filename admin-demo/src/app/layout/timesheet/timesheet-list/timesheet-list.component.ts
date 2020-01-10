import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GlobalValidate } from 'src/app/_base/class/global-validate';
import { BaseListComponent } from 'src/app/_base/components/base-list-component';
import { ProjectWorkService } from 'src/app/_shared/services/project-work.service';
import { TimesheetService } from 'src/app/_shared/services/timesheet.service';
import { DialogService } from 'src/app/_base/services/dialog.service';
import { StatusService } from 'src/app/_shared/services/status.service';
import { ExtensionService } from 'src/app/_base/services/extension.service';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { NzMessageService } from 'ng-zorro-antd/message';

import * as moment from 'moment';
@Component({
  selector: 'app-timesheet-list',
  templateUrl: './timesheet-list.component.html',
  styleUrls: ['./timesheet-list.component.scss']
})
export class TimesheetListComponent extends BaseListComponent implements OnInit {
  public sendData: any;
  public data: any[] = [];
  public alldata: any[] = [];
  // public listProj: any[];
  public paging: any = {
    page: 1,
    size: 20
  };
  constructor(
    private fb: FormBuilder,
    private ex: ExtensionService,
    public ex_tb: ExtentionTableService,
    private dl: DialogService,
    public projWorkService: ProjectWorkService,
    public timesheetService: TimesheetService,
    private message: NzMessageService
  ) {
    super();
  }

  creatForm() {
    this.myForm = this.fb.group({
      searchText: [''],
      // searchProj: [''],
      searchDate: [null]
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

  async ngOnInit() {


    this.creatForm();
    await this.getData();


  }



  // async getListPro() {
  //   this.listProj = [];
  //   let pa = { and: [] };
  //   const rs = await this.projWorkService.get(pa);
  //   if (rs.ok) {
  //     rs.result.data.forEach(item => {
  //       this.listProj.push({
  //         id: item.id,
  //         name: item.projName
  //       });
  //     });
  //   }
  // }


  async getData(page = 1) {
    this.data = [];

    this.paging.page = page;
    const form = this.myForm.value;
    // let datea=new Date();
    const where = { and: [] };
    // if (form.searchText !== '')
    if (!!form.searchText) {
      // tslint:disable-next-line: max-line-length
      where.and.push((!isNaN(+form.searchText)) ? { or: [{ id: +form.searchText }, { topic: { like: form.searchText } },] } : { topic: { like: form.searchText } });
    }

    if (form.searchDate) {
      where.and.push({ startDay: { lte: form.searchDate } });
      where.and.push({ endDate: { gte: form.searchDate } });
    } else {
      let startOfWeek = moment().startOf('week').toDate();
      let endOfWeek = moment().endOf('week').toDate();
      endOfWeek.setHours(0, 0, 0, 0);

      console.log('startOfWeek', startOfWeek);
      console.log('endOfWeek', endOfWeek);

      where.and.push({ startDay: { lte: endOfWeek } });
      where.and.push({ endDate: { gte: startOfWeek } });
    }

    console.log('Na searchDate', form.searchDate);



    if (where.and.length > 0) {
      this.paging.where = where;
    } else {
      delete this.paging.where;
      // where.and.push({or:[{startDay: datea}, {endDate: datea}, ]});
      // this.paging.where=where;
    }

    console.log('độ dài', where.and.length);
    console.log('chuoi', form.searchText + form.searchDate);
    console.log('where', where);
    console.log('paging', this.paging);


    const rs = await this.timesheetService.get(this.paging);

    console.log('Na test rs', rs);
    if (rs.ok) {
      this.alldata = rs.result.data;
      rs.result.data.forEach(x => {
        const day = (new Date(x.endDate).getTime() - new Date(x.startDay).getTime()) / 86400000;
        x.day = Math.round(day) === day ? day : Math.round(day) + 1;

        // this.data.push(x);

        const item = {
          Id: x.projwork.projGeneral ? x.projwork.projGeneral.id : null,
          projName: x.projwork.projGeneral ? x.projwork.projGeneral.projName : null,
          isShow: true,
          timeSheet: [x]
        }
        // debugger
        console.log('item', item);
        const index = this.data.findIndex(i => i.Id === x.projwork.projGeneralId);
        console.log('index', index);
        if (index === -1) {
          this.data.push(item);
        } else {
          this.data[index].timeSheet.push(x);
        }
      });
      console.log('Na test rs tinh', this.data);

      // this.data = rs.result.data;
      // console.log('Na test',this.data);
      this.paging = rs.result.paging;
    }

  }

}
