import { Component, OnInit, Input } from '@angular/core';
import { BaseDataComponent } from 'src/app/_base/components/base-data-component';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { GlobalValidate } from 'src/app/_base/class/global-validate';
import { ExtensionService } from 'src/app/_base/services/extension.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IssueService } from 'src/app/_shared/services/issue.service';
import { EmployeesService } from 'src/app/_shared/services/employees.service';
import { ProjectGeneralService } from 'src/app/_shared/services/project-general.service';
import { IssueTypeService } from 'src/app/_shared/services/issue-type.service';
import { IssueCausesService } from 'src/app/_shared/services/issue-causes.service';
import { StatusService } from 'src/app/_shared/services/status.service';
import { TimesheetService } from 'src/app/_shared/services/timesheet.service';
import { ProjectWorkService } from 'src/app/_shared/services/project-work.service';
import * as moment from 'moment';
import { Utilities } from 'src/app/_shared/extensions/utilities';
@Component({
  selector: 'app-timesheet-data',
  templateUrl: './timesheet-data.component.html',
  styleUrls: ['./timesheet-data.component.scss']
})
export class TimesheetDataComponent extends BaseDataComponent implements OnInit {


  public listPorjGen: any[] = [];
  public listDate: any[] = [];
  public listProjwork: any[] = [];
  public openTimesheetDetail: boolean;
  public myForm: FormGroup;
  constructor(
    fb: FormBuilder,
    private ex: ExtensionService,
    private sv: IssueService,
    private employeeService: EmployeesService,
    public projGeneralService: ProjectGeneralService,
    public IssuetypeService: IssueTypeService,
    public timesheetservice: TimesheetService,
    private statusSerive: StatusService,
    public IssuecausesService: IssueCausesService,
    public projWorkService: ProjectWorkService,


    private message: NzMessageService
  ) {
    super(fb);
  }

  async getListProjGen(value = null) {
    this.listPorjGen = [];
    const param = { where: { and: [] } };

    console.log('1', value);
    // console.log('Na test thu',moment(value).format('dddd L'));

    // console.log('Na test thu',moment(value).endOf('week').toDate());
    // let end=moment(value).endOf('week').toDate();
    let begin = moment(value).startOf('week').toDate();

    this.listDate = [];
    for (let i = 1; i <= 7; i++) {


      const name = moment(begin).format('DD-MM-YYYY');
      begin.setDate(begin.getDate() + 1);
      this.listDate.push({
        id: Utilities.guid(),
        name,
        dayOfWeek: i + 1
      });
    }
    console.log('listData', this.listDate);

    if (!!value) {

      param.where.and.push({ beginDate: { lte: value } });
      param.where.and.push({ endDate: { gte: value } });

      let rs = await this.projGeneralService.get(param);
      if (rs.ok) {

        console.log('Na rs', rs.result.data);
        if (rs.result.data.length > 0) {
          this.openTimesheetDetail = true;
        }
        else {
          this.openTimesheetDetail = false;
          this.message.warning('Chưa có dữ liệu');
        }

        rs.result.data.forEach(item => {
          this.listPorjGen.push({
            id: item.id,
            name: item.projName
          });
        });

      }
      else {
        this.myForm.get("Projid").setValue(null);

      }

    }
  }

  getNameDayOfWeek(value: number) {
    if (value < 8) {
      return `Thu ${value}`;
    } else {
      return ' CN';
    }
  }


  async ngOnInit() {
    this.createForm();
    // await this.getData();
  }

  updateData(value: any) {
    this.getListProjGen(value);
  }


  createForm() {
    this.myForm = this.fb.group({
      searchDate: [null],
      timesheets: this.fb.array([])
    });
    if (this.id) {

    } else {
      this.newTimeSheet();
    }
  }

  getTimeSheet() {
    return this.myForm.get('timesheets') as FormArray;
  }

  newTimeSheet() {
    const timesheets = this.getTimeSheet();
    timesheets.push(this.fb.group({
      ProjworkId: [null],
      Projid: [null],
      t2: [null],
      t3: [],
      t4: [],
      t5: [],
      t6: [],
      t7: [],
      cn: []
    }));
  }

  deleteTimeSheet(index: number) {
    const timesheets = this.getTimeSheet();
    timesheets.removeAt(index);
  }

  logValue(value: any) {
    console.log(value);
    // this.myForm.get("ProjworkId").setValue(null);
    this.getCV(value);
  }





  async submit() {
    super.submitForm();
    // console.log('value form', this.myForm.value);
    // if (this.myForm.invalid) return;
    // let rs = await this.timesheetservice.edit(this.timeSheetId.id, this.myForm.value);
    // if (rs.ok) {
    //   this.message.success('Cập nhập thành công');
    //   this.handleOk(rs.result);
    // }
    // else this.message.error('Lỗi! Cập nhập thất bại');
  }


  successMessage(type: string, text: string): void {
    this.message.create(type, text);
  }

  errorMessage(type: string, text: string): void {
    this.message.create(type, text);
  }

  disabledDate(current: Date): boolean {
    return current.getDay() !== 0;
  }

  async getCV(value = null) {
    this.listProjwork = [];
    let param = (value) ? { where: { projGeneralId: value } } : { where: { and: [] } };
    let rs = await this.projWorkService.get(param);
    console.log('Na param', param);
    console.log('Na obj', value);
    // console.log('Na rs',rs.result.data)
    if (rs.ok) {
      rs.result.data.forEach(x => {
        this.listProjwork.push({
          id: x.id,
          name: x.workName
        });
      });
    }
  }


}
