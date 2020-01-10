import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProjectWorkService } from 'src/app/_shared/services/project-work.service';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { BaseListComponent } from 'src/app/_base/components/base-list-component';
import { NzMessageService } from 'ng-zorro-antd';
import { DialogService } from 'src/app/_base/services/dialog.service';
import { ExtensionService } from 'src/app/_base/services/extension.service';
import { StatusService } from 'src/app/_shared/services/status.service';
import { TimesheetService } from 'src/app/_shared/services/timesheet.service';
import { TimesheetdetailService } from 'src/app/_shared/services/timesheetdetail.service'
import { EmployeesService } from 'src/app/_shared/services/employees.service';

@Component({
  selector: 'app-project-work',
  templateUrl: './project-work.component.html',
  styleUrls: ['./project-work.component.scss']
})
export class ProjectWorkComponent extends BaseListComponent implements OnInit {
  public data: any[] = [];
  // is_showTimesheet = false;
  public isLoad = true;
  public isView: boolean;
  public is_save: boolean;
  public link;
  public listStatus: any[];
  public sendData: any;
  constructor(public projWorkService: ProjectWorkService,
    private dl: DialogService,
    public exTableService: ExtentionTableService,
    public timesheetService: TimesheetService,
    public timesheetdetailservice: TimesheetdetailService,
    private message: NzMessageService,
    private ex: ExtensionService,
    private statusSerive: StatusService,
    public employeeService:EmployeesService,
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
    // lấy danh sách trạng thái với loại = 1:CV (Công việc)
    const param = { where: { and: [{ 'data.statusType': 1 }, { 'dataDb.status': 1 }] } };
    const status = await this.statusSerive.get(param);
    console.log(status);

    if (status.ok) {
      status.result.data.forEach(item => {
        this.listStatus.push({
          id: item.id,
          name: item.data.statusName
        });
      });
    }
  }

  async getData(page = 1) {
    this.data = [];
    this.paging.page = page;
    this.paging.order=[{"projGeneralId":false},{"id":false}];
    const form = this.myForm.value;
    const where = { and: [] };
    // tìm kiếm theo trạng thái
    if (form.searchStatus) {
      where.and.push({ statusId: +form.searchStatus });
    }
    // tìm kiếm theo tên hoặc mã
    if (form.searchText !== '') {
      where.and.push((!isNaN(+form.searchText)) ? { or: [{ id: +form.searchText }, { workName: { like: form.searchText } },] } : { workName: { like: form.searchText } });
    }
    // set where
    if (where.and.length > 0) {
      this.paging.where = where;
    } else {
      delete this.paging.where;
    }
    this.isLoading = true;
    const rs = await this.projWorkService.get(this.paging);
    this.isLoading = false;
    if (rs.ok) {
      this.listOfData = rs.result.data;
      rs.result.data.forEach(async x => {
        let time =new Date(x.endDate).getTime()- new Date(x.beginDate).getTime();
        x.day=(Math.round(time/86400000)+1);
        let emp= await this.employeeService.findOneById(x.empId);
        x.empName=(emp.ok && emp.result)?emp.result.basic.fullName:'';
        const item = {
          projId: x.projGeneralId,
          projName: x.projGeneral ? x.projGeneral.projName : '',
          isShow: true,
          projWork: [x]
        };
        const index = this.data.findIndex(i => i.projId === x.projGeneralId);
        index === -1 ? this.data.push(item) : this.data[index].projWork.push(x);

      });
      console.log(this.data);
      
      this.paging = rs.result.paging;
      console.log(rs.result);

    }
  }

  async deleteChoices() {
    const result = await this.dl.confirm('Bạn có muốn xóa những dữ liệu này không?', ' ');
    if (result) {
      const lstSelected = this.exTableService.getitemSelected(this.listOfData);
      const lstDeleting = [];
      let i = 0;
      for (const item of lstSelected) {
        i++;
        const delObj = await this.projWorkService.delete(item.id);

        const p = {
          where: {
            and: [{
              'projworkId': item.id
            }]
          }
        };
        // console.log('Na test projworkId 2 ',p);
        const a = await this.timesheetService.get(p);
        // console.log('Na test TS', a.result.data);
        if (a.ok) {
          const ts = a.result.data[0].id;
          // console.log('Na ts',ts);
          const i = await this.timesheetService.delete(ts);
          const p1 = {
            where: {
              and: [{
                'timeSheetId': ts
              }]
            }
          };
          const b = await this.timesheetdetailservice.get(p1);
          if (b.ok) {
            b.result.data.forEach(async item => {
              let g = await this.timesheetdetailservice.delete(item.id);

            });
          }
          // if(i.ok)
          // this.message.warning('Xóa cv bên timesheet thành công ^_^ test');
          // ----


        }

        lstDeleting.push(delObj);
      }
      await Promise.all(lstDeleting);
      this.exTableService.unselectAll(this.listOfData);
      this.message.success('Xóa dữ liệu thành công');
      const size = (this.listOfData.length - i === 0) ? this.paging.page - 1 : this.paging.page;
      this.getData(size);
    }
  }

  async deleteDialog(id: number) {
    const result = await this.dl.confirm('<i>Bạn có muốn xóa dữ liệu này không?</i>', '<b> </b>');
    if (result) {
      // console.log('Na test projworkId ',id);
      const rs = await this.projWorkService.delete(id);

      // xoa doi tuong trong bang timesheet sau khi xoa doi tuong ben bang projwork

      const p = {
        where: {
          and: [{
            'projworkId': id
          }]
        }
      };

      // console.log('Na test projworkId 2 ',p);
      const a = await this.timesheetService.get(p);
      // console.log('Na test TS', a.result.data);
      if (a.ok) {
        const ts = a.result.data[0].id;
        // console.log('Na ts',ts);

        const i = await this.timesheetService.delete(ts);
        const p1 = {
          where: {
            and: [{
              'timeSheetId': ts
            }]
          }
        };
        const b = await this.timesheetdetailservice.get(p1);
        if (b.ok) {
          b.result.data.forEach(async item => {
            let g = await this.timesheetdetailservice.delete(item.id);

          });
        }

        // if(i.ok)
        // this.message.warning('Xóa cv bên timesheet thành công ^_^ test');


        // ----
        this.ex.logDebug('Delete response', rs);
        if (rs.ok) {
          console.log(this.listOfData.length, this.paging.page);
          this.getData(this.listOfData.length === 1 ? this.paging.page - 1 : this.paging.page);
          this.message.success('Xóa dữ liệu thành công');
        }
      }
    }
  }



  // openDataModaltime() {
  //   this.is_showTimesheet = true;
  // }

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

  setClassPercent(value: number) {
    const className = value > (100 / 3 * 2) ? 'bg-success' : ((value <= (100 / 3)) ? 'bg-danger' : 'bg-orange-300') ;
    return className;
  }
}
