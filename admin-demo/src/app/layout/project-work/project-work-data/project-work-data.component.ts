import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalValidate } from 'src/app/_base/class/global-validate';
import { BaseDataComponent } from 'src/app/_base/components/base-data-component';
import { ProjectGeneralService } from 'src/app/_shared/services/project-general.service';
import { EmployeesService } from 'src/app/_shared/services/employees.service';
import { WorkTypeService } from 'src/app/_shared/services/work-type.service';
import { PartnerService } from 'src/app/_shared/services/partner.service';
import { PriorityService } from 'src/app/_shared/services/priority.service';
import { TargetService } from 'src/app/_shared/services/target.service';
import { NzMessageService } from 'ng-zorro-antd';
import { StatusService } from 'src/app/_shared/services/status.service';
import { ProjectWorkService } from 'src/app/_shared/services/project-work.service';
import { TimesheetService } from 'src/app/_shared/services/timesheet.service';
import { ExtensionService } from 'src/app/_base/services/extension.service';
import { Utilities } from 'src/app/_shared/extensions/utilities';
import { TimesheetdetailService } from 'src/app/_shared/services/timesheetdetail.service';
import { TargetDetailService } from 'src/app/_shared/services/target-detail.service';

@Component({
  selector: 'app-project-work-data',
  templateUrl: './project-work-data.component.html',
  styleUrls: ['./project-work-data.component.scss']
})

export class ProjectWorkDataComponent extends BaseDataComponent implements OnInit {
  @Input() projGenId: number;
  public data: any = null;
  public myForm: FormGroup;
  public listPriority: any[] = [];
  public load = true;
  public listStatus: any[];
  public listTypeWorks: any[];
  public listPartners: any[];
  public listTarget: any[];
  public listProject: any[];
  public listEmployee: any[];
  public listProjWork: any[];
  public openTab = 1;
  public projWorkName = '';
  public projGeneralId: number;
  constructor(
    fb: FormBuilder,
    public projGeneralService: ProjectGeneralService,
    public projWorkService: ProjectWorkService,
    public timesheetDetailService: TimesheetdetailService,
    public timesheetService: TimesheetService,
    private targetService: TargetService,
    private employeeService: EmployeesService,
    private workTypeService: WorkTypeService,
    private partnerService: PartnerService,
    private prioritySrevice: PriorityService,
    private statusSerive: StatusService,
    private message: NzMessageService,
    private ex: ExtensionService,
    private targetDetailService: TargetDetailService
  ) { super(fb); }

  async ngOnInit() {
    this.creatForm();
    let task = [this.getEmployee(), this.getStatus(), this.getTypeWork(), this.getTarget(), this.getListPriority(), this.getListPriority(), this.getProject()];
    await Promise.all(task);
    this.getData();
   
  }

  creatForm() {
    this.myForm = this.fb.group({
      projGeneralId: [null, [GlobalValidate.required({ error: 'Dự án không được để trống' })]],
      workName: [null, [GlobalValidate.required({ error: 'Tên công việc không được để trống' })]],
      statusId: [null, GlobalValidate.required({ error: 'Trạng thái không được để trống' })],
      workCompleted: [{ value: 0.00, disabled: this.isView }, GlobalValidate.required({ error: '% Hoàn thành công việc không được để trống' })],
      classifyWorks: [null, GlobalValidate.required({ error: 'Loại công việc không được để trống' })],
      priority: [null, GlobalValidate.required({ error: 'Ưu tiên không được để trống' })],
      beginDate: [Utilities.DateNowUTC()],
      endDate: [Utilities.DateNowUTC()],
      timePlan: [null],
      timeReality: [null],
      content: [null],
      empId: [null, GlobalValidate.required({ error: 'Người phụ trách không được để trống' })],
      targetId: [null, GlobalValidate.required({ error: 'Mục tiêu không được để trống' })],
      coordinationList: [null],
      contact: [null],
      perrentId: [null],
      note: [null],
      completeDate: [null]
    });
    if (this.isView) {
      this.myForm.disable();
    }
  }

  async getEmployee() {
    this.listEmployee = [];
    let rs = await this.employeeService.get({ where: { "dataDb.status": 1 } });
    if (rs.ok) {
      this.listEmployee = rs.result.data.map(x => {
        return {
          id: x.id,
          name: x.basic.fullName
        };
      });
    }
  }

  async getProjWork() {
    this.listProjWork = [];
    let projectId= this.myForm.get('projGeneralId').value;
    if(projectId){
      let param={
        where:{
          and:[
            {'projGeneralId':projectId},
            {'id':{neq:this.id}}
          ]
        }
      };
      if(!this.id){param.where.and.pop();}
      let rs = await this.projWorkService.get(param);
      if (rs.ok) {
        this.listProjWork = rs.result.data.map(x => {
          return {
            id: x.id,
            name: x.workName
          };
        });
      }
    }
  }

  async getListPriority() {
    let priority = await this.prioritySrevice.getAll();
    if (priority.ok) {
      this.listPriority = priority.result;
    }

  }

  async getStatus() {
    this.listStatus = [];
    const param = { where: { and: [{ 'data.statusType': 1 }, { "dataDb.status": 1 }] } };
    let rs = await this.statusSerive.get(param);
    if (rs.ok) {
      this.listStatus = rs.result.data.map(item => {
        return {
          id: item.id,
          name: item.data.statusName
        };
      });
    }
  }

  async getTypeWork() {
    this.listTypeWorks = [];
    let rs = await this.workTypeService.get({ where: { "dataDb.status": 1 } });
    if (rs.ok) {
      this.listTypeWorks = rs.result.data.map(item => {
        return {
          id: item.id,
          name: item.data.workTypeName
        };
      });
    }
  }

  async getPartners() {
    this.listPartners = [];
    let rs = await this.partnerService.get({ where: { "dataDb.status": 1 } });
    if (rs.ok) {
      this.listPartners = rs.result.data.map(item => {
        return {
          id: item.id,
          name: item.data.partnerNameVn
        };
      });
    }
  }

  async getProject() {
    this.listProject = [];
    let rs = await this.projGeneralService.get({ size: 200 });
    if (rs.ok) {
      this.listProject = rs.result.data.map(item => {
        return {
          id: item.id,
          name: item.projName,
          endDate: item.endDate,
          beginDate: item.beginDate
        };
      });
    }
  }

  async getTarget() {
    this.listTarget = [];
    const param = { where: { and: [{ 'data.idtarget': null }] } };
    let rs = await this.targetDetailService.get(param);
    if (rs.ok) {
      this.listTarget = rs.result.data.map(item => {
        return {
          id: item.id,
          name: item.data.targetDetailNameVn
        };
      });
    }
  }

  async getData() {
    if (this.id) {
      let rs = await this.projWorkService.findOneById(this.id);
      this.ex.logDebug('getData', rs);
      if (rs.ok) {
        this.myForm.patchValue(rs.result);
        this.projGeneralId = +this.myForm.get('projGeneralId').value;
        this.getProjWork();
        this.showDate();
      }
    }
    if (this.projGenId) {
      this.myForm.patchValue({ projGeneralId: this.projGenId });
    }
  }


  updateValidate() {
    let form = this.myForm.value;
    if (form.endDate < form.beginDate) {
      this.myForm.get('endDate').setErrors({error: 'Ngày kết thúc không được nhỏ hơn ngày bắt đầu'});
    }else{
      this.myForm.get('endDate').setErrors(null)
    }
  }

showDate(){
  let form=this.myForm.value;
  console.log('date',form.endDate,form.beginDate);
}

  updateStatus() {
    let form = this.myForm.value;
    if (form.statusId === 11) {
      this.myForm.get('workCompleted').setValue(100);
      this.myForm.get('completeDate').setValue(Utilities.DateNowUTC());
    }
    else {
      this.myForm.get('workCompleted').setValue(0);
      this.myForm.get('completeDate').setValue(null);
    }
  }

  async submit() {
    super.submitForm();
   
    this.ex.logDebug('formData', this.myForm.value);
    const tabFocus = this.validateTab(this.myForm);
    if (tabFocus) { this.openTab = tabFocus; }

    if (this.myForm.invalid) {
      document.getElementById('workName').focus();
      return;
    }
    let rs;
    if (!this.id) {
      let param = {
        where: {
          and: [{
            "projGeneralId": this.myForm.get('projGeneralId').value
          }, {
            "workName": this.myForm.get('workName').value
          }]
        }
      };
      let work = await this.projWorkService.get(param);
      if (work.result.data.length > 0) {
        this.message.warning('Tên công việc đã tồn tại');
        this.myForm.get('workName').reset();
        document.getElementById('workName').focus();
        return;
      }
      rs = await this.projWorkService.add(this.myForm.value);

      //them cong viec vào timesheet
      let p = {
        where: {
          and: [{
            "projGeneralId": this.myForm.get('projGeneralId').value
          }, {
            "workName": this.myForm.get('workName').value
          }]
        }
      };
      let ts = await this.projWorkService.get(p);
      let j = {
        "projworkId": ts.result.data[0].id,
        "topic": ts.result.data[0].workName,
        "dateNumber": 0,
        "startDay": ts.result.data[0].beginDate,
        "endDate": ts.result.data[0].endDate,
        "t2": 0,
        "t3": 0,
        "t4": 0,
        "t5": 0,
        "t6": 0,
        "t7": 0,
        "cn": 0
      };
      await this.timesheetService.add(j);
      let e = {
        where: {
          and: [{
            "projworkId": ts.result.data[0].id
          }, {
            "topic": ts.result.data[0].workName
          }]
        }
      };
      let a = await this.timesheetService.get(e);
      if (a.ok) {
        let g = {
          "timeSheetId": a.result.data[0].id,
          "startDate": a.result.data[0].startDay,
          "endDate": a.result.data[0].endDate,
          "dataDb": {
            "status": 1
          }
        };
        await this.timesheetDetailService.add(g);
      }
      // if(ts.result.data[0].beginDate = ts.result.data[0].endDate){
      //   k=ts.result.data[0].beginDate;
      // }
      // if(ts.result.data[0].beginDate < ts.result.data[0].endDate){

      // }
      //------------------------
    }
    else {
      rs = await this.projWorkService.edit(this.id, this.myForm.value);

      let p = {
        where: {
          and: [{
            "projGeneralId": this.myForm.get('projGeneralId').value
          }, {
            "workName": this.myForm.get('workName').value
          }]
        }
      };
      let ts = await this.projWorkService.get(p);
      let j = {
        "projworkId": ts.result.data[0].id,
        "topic": ts.result.data[0].workName,
        "dateNumber": 0,
        "startDay": ts.result.data[0].beginDate,
        "endDate": ts.result.data[0].endDate,
        "t2": 0,
        "t3": 0,
        "t4": 0,
        "t5": 0,
        "t6": 0,
        "t7": 0,
        "cn": 0
      };
      let p1 = {
        where: {
          and: [{
            "projworkId": ts.result.data[0].id
          }, {
            "topic": ts.result.data[0].workName
          }]
        }
      };
      let h = await this.timesheetService.get(p1);
      if (h.ok && h.result.data.length>0) {
        await this.timesheetService.edit(h.result.data[0].id, j);
      }
    }

    // let rs = ((!this.id) ? await this.projWorkService.add(this.myForm.value) : await this.projWorkService.edit(+this.id, this.myForm.value));
    if (rs.ok) {
      this.message.success('Lưu thành công');
      this.id = rs.result.id;
      this.projGeneralId = +this.myForm.get('projGeneralId').value;
      this.handleOk(rs.result);
    }
    else this.message.error('Lỗi! Lưu thất bại');
  }
}
