import { Component, OnInit, Input } from '@angular/core';
import { BaseDataComponent } from 'src/app/_base/components/base-data-component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalValidate } from 'src/app/_base/class/global-validate';
import { ExtensionService } from 'src/app/_base/services/extension.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IssueService } from 'src/app/_shared/services/issue.service';
import { EmployeesService } from 'src/app/_shared/services/employees.service';
import { ProjectGeneralService } from 'src/app/_shared/services/project-general.service';
import { IssueTypeService } from 'src/app/_shared/services/issue-type.service';
import { IssueCausesService } from 'src/app/_shared/services/issue-causes.service';
import { StatusService } from 'src/app/_shared/services/status.service';
import { Utilities } from 'src/app/_shared/extensions/utilities';

@Component({
  selector: 'app-issue-data',
  templateUrl: './issue-data.component.html',
  styleUrls: ['./issue-data.component.scss']
})
export class IssueDataComponent extends BaseDataComponent implements OnInit {
  @Input() projGenId: number;
  public id: number;
  public openTab: number = 1;
  public myForm: FormGroup;
  public listIssueCausesName: any[];
  public ListLevelIssue: any[];
  public listPriority: any[];
  public listTypeWorks: any[];
  public listPartners: any[];
  public listTarget: any[];
  public listProject: any[];
  public listTypeIssue: any[];
  public listEmployee: any[];
  public listStatus: any[];

  constructor(
    fb: FormBuilder,
    private ex: ExtensionService,
    private sv: IssueService,
    private employeeService: EmployeesService,
    public projGeneralService: ProjectGeneralService,
    public IssuetypeService: IssueTypeService,
    private statusSerive: StatusService,
    public IssuecausesService: IssueCausesService,

    private message: NzMessageService
  ) {
    super(fb);
  }




  async ngOnInit() {
    this.createForm();
    this.getData();
    this.getStatus();
    this.getProject();
    this.getNameTypeIssue();
    this.getlistPriority();

    this.getlistIssueCausesName();
    this.getListLevelIssue();
    this.getEmployee();

    this.openTab = 1;


  }

  createForm() {
    this.myForm = this.fb.group({
      // id: null,
      issueName: [null, GlobalValidate.required({ error: 'Tên vấn đề không được để trống' })],
      statusId: [null],
      percentCompleted: [0.00, GlobalValidate.required({ error: '% Hoàn thành công việc không được để trống' })],
      completedDate: [null],
      issueTypeId: [null],
      priority: [null],
      beginDate: [{ value: Utilities.DateNowUTC(), disabled: this.isView }],
      endDate: [{ value: Utilities.DateNowUTC(), disabled: this.isView }],
      timePlan: [null],
      timeReality: [null],
      empId: [null],
      content: [null],
      note: [null],
      solusion: [null],
      levelIssue: [null],
      issueCausesId: [null],
      projId: [null],
      flag: [0],
      coordinationList: [[]]
      // note: null
    });
  }
  update() {

    let rs = this.myForm.get("statusId").value;
    if (rs === 11) {
      this.myForm.get("percentCompleted").setValue(100);
      this.myForm.get("completedDate").setValue(Utilities.DateNowUTC());
    }
    else {
      this.myForm.get("percentCompleted").setValue(0);
      this.myForm.get("completedDate").setValue(null);
    }
  }
  async getEmployee() {
    this.listEmployee = [];
    let emp = await this.employeeService.get({ where: { "dataDb.status": 1 } });
    if (emp.ok) {
      emp.result.data.forEach(x => {
        this.listEmployee.push({
          id: x.id,
          name: x.basic.fullName
        });
      });
    }
  }
  // lấy danh sách trạng thái
  async getStatus() {
    this.listStatus = [];
    const param = { where: { and: [{ 'data.statusType': 1 }, { "dataDb.status": 1 }] } };
    let rs = await this.statusSerive.get(param);
    console.log('Trang thai:', rs.result.data);
    if (rs.ok) {
      rs.result.data.forEach(item => {
        this.listStatus.push({
          id: item.id,
          name: item.data.statusName
        });
      });
    }
    console.log('Trang thai:', this.listStatus);
  }

  //lay danh sach du an
  async getProject() {
    this.listProject = [];
    let data = await this.projGeneralService.get({});
    if (data.ok) {
      data.result.data.forEach(item => {
        this.listProject.push({
          id: item.id,
          name: item.projName
        });
      });
    }
    console.log('Na thứ 5', this.listProject);
  }

  // lay danh sach ưu tien
  async getlistPriority() {
    this.listPriority = [];
    let data = await this.sv.ListPriority();
    //console.log('Na test 1', data);
    if (data.ok) {
      data.result.forEach(item => {
        this.listPriority.push({
          id: item.id,
          name: item.name
        });
      });
    }
    console.log('Na test listPriority', this.listPriority);
  }

  // lấy danh sach Muc do
  async getListLevelIssue() {
    this.ListLevelIssue = [];
    let data = await this.sv.ListLevelIssue();
    if (data.ok) {
      data.result.forEach(item => {
        this.ListLevelIssue.push({
          id: item.id,
          name: item.name
        });
      });
    }
  }

  // lấy danh sách Nguyên nhân vấn đề
  async getlistIssueCausesName() {
    this.listIssueCausesName = [];
    let data = await this.IssuecausesService.get({});
    if (data.ok) {
      data.result.data.forEach(item => {
        this.listIssueCausesName.push({
          id: item.id,
          name: item.data.issueCausesName
        });
      });
    }

  }

  // lấy danh sách phân loại vấn đề
  async getNameTypeIssue() {
    this.listTypeIssue = [];
    let data = await this.IssuetypeService.get({});
    if (data.ok) {
      data.result.data.forEach(item => {
        this.listTypeIssue.push({
          id: item.id,
          name: item.data.issueTypeName
        });
      });
    }
    console.log('Na test PL', data.result.data);
  }

  async submit() {
    super.submitForm();
    console.log('value form', this.myForm.value);
    // debugger
    if (this.myForm.invalid) return;
    if (!this.id) {
      let param = {
        where: {
          and: [{
            "projId": this.myForm.get('projId').value
          }, {
            "issueName": this.myForm.get('issueName').value
          }]
        }
      };
      let work = await this.sv.get(param);
      if (work.result.data.length > 0) {
        this.message.warning('Tên vấn đề đã tồn tại');
        this.myForm.get('issueName').reset();
        return;
      }
      else {
        this.myForm.get("flag").setValue(0);
      }
    }
    let rs = ((!this.id) ? await this.sv.add(this.myForm.value) : await this.sv.edit(this.id as number, this.myForm.value));
    if (rs.ok) {
      this.message.success('Lưu thành công');
      this.id = rs.result.id;
      this.handleOk(rs.result);
    }
    else this.message.error('Lỗi! Lưu thất bại');
  }


  // async submitForm() {


  //   super.submitForm();
  //   if (this.myForm.invalid) { return; }
  //   const body: any = this.myForm.value;
  //   // body.dataDb.status = body.dataDb.status ? 1 : 0;
  //   this.isLoading = true;
  //   let result: any;
  //   if (this.id) {
  //     const rs = await this.sv.edit(this.id as number, body);
  //     this.isLoading = false;
  //     if (rs.ok) {
  //       result = rs.result;
  //       this.successMessage('success', 'Cập nhật dữ liệu thành công');
  //     } else {
  //       this.errorMessage('error', 'Cập nhật dữ liệu thất bại');
  //     }
  //   } else {
  //     const rs = await this.sv.add(body);
  //     this.isLoading = false;
  //     if (rs.ok) {
  //       result = rs.result;
  //       this.successMessage('success', 'Thêm dữ liệu thành công');
  //     } else {
  //       this.errorMessage('error', 'Thêm dữ liệu thất bại');
  //     }
  //   }
  //   this.handleOk(result);
  // }

  async getData() {
    console.log(this.myForm.value);
    if (this.id) {
      let rs = await this.sv.findOneById(this.id);
      if (rs.ok) {
        this.myForm.patchValue(rs.result);
      }
    }
    if (this.projGenId) {
      //this.myForm.patchValue({ projId: this.projGenId });
      this.myForm.get('projId').setValue(this.projGenId);
    }
    if (this.isView) {
      this.myForm.disable();
    }
  }

  successMessage(type: string, text: string): void {
    this.message.create(type, text);
  }

  errorMessage(type: string, text: string): void {
    this.message.create(type, text);
  }

}
