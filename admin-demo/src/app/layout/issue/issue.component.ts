import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/_base/services/dialog.service';
import { ExtensionService } from 'src/app/_base/services/extension.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BaseListComponent } from 'src/app/_base/components/base-list-component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IssueService } from 'src/app/_shared/services/issue.service';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { EmployeesService } from 'src/app/_shared/services/employees.service';
import { StatusService } from 'src/app/_shared/services/status.service';
import { ProjectWorkService } from 'src/app/_shared/services/project-work.service';
import { TimesheetService } from 'src/app/_shared/services/timesheet.service';
import { TimesheetdetailService } from 'src/app/_shared/services/timesheetdetail.service';
@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent extends BaseListComponent implements OnInit {

  public myForm: FormGroup;
  public isOpenContent = false;
  public data: any[] = [];
  public listEmployee: any[] = [];
  public listStatus: any[];

  public paging: any = {
    page: 1,
    size: 20
  };

  constructor(
    private dl: DialogService,
    private employeeService: EmployeesService,
    public projWorkService: ProjectWorkService,
    public timesheetService: TimesheetService,
    public timesheetDetailService: TimesheetdetailService,
    private sv: IssueService,
    private statusSerive: StatusService,
    private ex: ExtensionService,
    public exTableService: ExtentionTableService,
    private fb: FormBuilder,
    private message: NzMessageService,

  ) {
    super();
  }

  async ngOnInit() {
    await this.getEmployee();
    await this.getStatus();
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
    const param = { where: { and: [{ 'data.statusType': 1 }, { 'dataDb.status': 1 }] } };
    const rs = await this.statusSerive.get(param);
    console.log('Trang thai:', rs.result.data);
    if (rs.ok) {
      rs.result.data.forEach(item => {
        this.listStatus.push({
          id: item.id,
          name: item.data.statusName
        });
      });
    }
    // console.log('Trang thai:',this.listStatus);
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
    const rs = await this.employeeService.get({ where: { 'dataDb.status': 1 } });
    if (rs.ok) {
      rs.result.data.forEach(x => {
        this.listEmployee.push({
          id: x.id,
          name: x.basic.fullName
        });
      });
    }
  }



  async getData(page = 1) {
    this.data = [];
    this.paging.page = page;
    const where = { and: [] };
    const form = this.myForm.value;

    if (form.searchStatus) {
      where.and.push({ statusId: +form.searchStatus });
    }
    console.log('Trạng thái', form.searchStatus);
    // tìm kiếm theo tên hoặc mã
    if (!!form.searchText) {
      where.and.push((!isNaN(+form.searchText)) ? { or: [{ id: +form.searchText }, { issueName: { like: form.searchText } },] } : { issueName: { like: form.searchText } });
    }
    if (where.and.length > 0) { this.paging.where = where; } else {
      delete this.paging.where;
    }

    console.log('chuoi', form.searchText + form.searchStatus);
    console.log('paging', this.paging);

    this.isLoading = true;
    const rs = await this.sv.get(this.paging);
    this.isLoading = false;

    this.ex.logDebug('getData', rs.result.data);
    if (rs.ok) {

      this.listOfData = rs.result.data;
      rs.result.data.forEach(x => {
        const day = (new Date(x.endDate).getTime() - new Date(x.beginDate).getTime()) / 86400000;
        console.log('day na test 1',day);
        x.day = Math.round(day) === day ? day : Math.round(day) + 1;
        x.day=(x.day===0) ? (x.day+1): x.day;
        console.log('day na test 2',x.day);
        if (x.coordinationList.length >= 2) {
          for (let k = 0; k < x.coordinationList.length; k++) {

            this.listEmployee.forEach(j => {

              if (j.id === x.coordinationList[k]) {
                if (k === 0) {
                  x.name2 = j.name;
                } else {
                  x.name2 = j.name + ', ' + x.name2;
                }

              }

            });
          }
        } else {
          this.listEmployee.forEach(g => {
            if (g.id === x.empId) {
              x.name2 = g.name;
            }

          });
        }

        this.listEmployee.forEach(h => {
          if (h.id === x.empId) { x.namee = h.name; }

        });

        const item = {
          Id: x.projId,
          projName: x.proj ? x.proj.projName: '',
          isShow: true,
          issue: [x]
        };

        const index = this.data.findIndex(i => i.Id === x.projId);
        if (index === -1) {
          this.data.push(item);
        } else {
          this.data[index].issue.push(x);
        }
        x.toggle = 'close-text';
        x.disable = x.flag === 1;
      });
      console.log('data', rs.result.data);

      this.paging = rs.result.paging;

    }
    // this.refreshStatus();
  }

  async CheckIssue(item: any) {
    console.log('test id', item);
    if (!!item) {
      const param = {
        where: {
          and: [{
            projGeneralId: item.projId
          }, {
            workName: item.issueName
          }]
        }
      };
      console.log('Na xem p', param);
      const work = await this.projWorkService.get(param);
      console.log('Na xem', work);
      if (work.result.data.length > 0) {
        this.message.warning('Tên công việc đã tồn tại');
        return;
      } else {
        const j = {
          projGeneralId: item.projId,
          workName: item.issueName,
          statusId: item.statusId,
          workCompleted: item.percentCompleted,
          classifyWorks: 'NULL',
          beginDate: item.beginDate,
          endDate: item.endDate,
          timePlan: item.timePlan,
          timeReality: item.timeReality,
          content: item.content,
          empId: item.empId,
          targetId: 0,
          perrentId: 0,
          priority: item.priority,
          note: item.note,
          contact: 'NULL',
          coordinationList: item.coordinationList
        };
        console.log('lấy thông tin j', j);
        const rs = await this.projWorkService.add(j);
        console.log('Add issue sang cv', rs);
        if (rs.ok) {
          const p = {
            where: {
              and: [{
                projGeneralId: item.projId
              }, {
                workName: item.issueName
              }]
            }
          };
          const ts = await this.projWorkService.get(p);
          console.log('Na test chuyen timesheet', ts.result.data);
          if (ts.ok) {
            const j = {
              projworkId: ts.result.data[0].id,
              topic: ts.result.data[0].workName,
              dateNumber: 0,
              startDay: ts.result.data[0].beginDate,
              endDate: ts.result.data[0].endDate,
              t2: 0,
              t3: 0,
              t4: 0,
              t5: 0,
              t6: 0,
              t7: 0,
              cn: 0

            };
            const h = await this.timesheetService.add(j);

            const e = {
              where: {
                and: [{
                  projworkId: ts.result.data[0].id
                }, {
                  topic: ts.result.data[0].workName
                }]
              }
            };
            const a = await this.timesheetService.get(e);
            if (a.ok) {
              const g = {
                timeSheetId: a.result.data[0].id,
                startDate: a.result.data[0].startDay,
                endDate: a.result.data[0].endDate,
                dataDb: {
                  status: 1
                }
              };
              await this.timesheetDetailService.add(g);
            }
            if (h.ok) {
              const g = {

                issueName: item.issueName,
                issueTypeId: item.issueTypeId,
                statusId: item.statusId,
                percentCompleted: item.percentCompleted,
                completedDate: item.completedDate,
                priority: item.priority,
                beginDate: item.beginDate,
                endDate: item.endDate,
                timePlan: item.timePlan,
                timeReality: item.timeReality,
                empId: item.empId,
                content: item.content,
                coordinationList: item.coordinationList,
                projId: item.projId,
                contactList: item.contactList,
                note: item.note,
                levelIssue: item.levelIssue,
                solusion: item.solusion,
                issueCausesId: item.issueCausesId,
                flag: 1
              };
              await this.sv.edit(item.id, g);
            }

          }
          this.message.success('Chuyển vấn đề sang công việc thành công');
        }
        this.getData(this.paging.page);
      }
    }
  }

  async deleteDialog(id: number) {
    this.paging.page = this.listOfData.length === 1 ? this.paging.page - 1 : this.paging.page;
    const result = await this.dl.confirm('<i>Bạn có muốn xóa dữ liệu này không?</i>', '<b> </b>');
    if (result) {
      const rs = await this.sv.delete(id);
      this.ex.logDebug('Delete response', rs);
      if (rs.ok) {
        console.log(this.data.length, this.paging.page);
        this.getData(this.paging.page);
        this.message.success('Xóa dữ liệu thành công');
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
      this.message.success('Xóa dữ liệu thành công');
      this.getData();
    }
  }

  setClassPercent(value: number) {
    const className = value > (100 / 3 * 2) ? 'bg-success' : ((value <= (100 / 3)) ? 'bg-danger' : 'bg-orange-300');
    return className;
  }

  // async updateStatus(item: any, status: number) {
  //   const changeVal = 1 - status;
  //   const rs = await this.sv.patch(item.id, { dataDb: { status: changeVal } });
  //   if (rs.ok) {
  //     item.dataDb.status = changeVal;
  //     item.isHidden = !!!item.isHidden;
  //   } else {
  //     this.dl.error('Lỗi hệ thống', 'Dữ liệu của bạn không cập nhật thành công do lỗi hệ thống');
  //   }
  // }

  deleteMessage() {
    this.message.success('Xóa dữ liệu thành công');
  }

  toggleContent() {
    this.isOpenContent = !this.isOpenContent;
  }

}
