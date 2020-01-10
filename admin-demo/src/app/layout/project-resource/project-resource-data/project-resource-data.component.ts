import { Component, OnInit } from '@angular/core';
import { BaseDataComponent } from 'src/app/_base/components/base-data-component';
import { FormBuilder } from '@angular/forms';
import { GlobalValidate } from 'src/app/_base/class/global-validate';
import { ExtensionService } from 'src/app/_base/services/extension.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProjectResourceService } from 'src/app/_shared/services/project-resource.service';
import { EmployeesService } from 'src/app/_shared/services/employees.service';
import { PositionService } from 'src/app/_shared/services/position.service';
import { JobPostionService } from 'src/app/_shared/services/job-postion.service';
import { ProjectGeneralService } from 'src/app/_shared/services/project-general.service';

@Component({
  selector: 'app-project-resource-data',
  templateUrl: './project-resource-data.component.html',
  styleUrls: ['./project-resource-data.component.scss']
})
export class ProjectResourceDataComponent extends BaseDataComponent implements OnInit {

  public listEmployee: any[];
  public listPosition: any[] = [];
  public listJobPosition: any[] = [];
  public listProject: any[];
  constructor(
    fb: FormBuilder,
    private ex: ExtensionService,
    private sv: ProjectResourceService,
    private employeesService: EmployeesService,
    private message: NzMessageService,
    private positionService: PositionService,
    private jobPositionService: JobPostionService,
    private projectService: ProjectGeneralService
  ) {
    super(fb);
  }

  async ngOnInit() {
    this.createForm();
    this.getEmployee();
    this.getJobPosition();
    this.getPosition();
    this.getProject();
  
    if (this.id) {
      const rs = await this.sv.findOneById(this.id);
      this.ex.logDebug('Edit item', rs);
      if (rs.ok) {
        this.myForm.patchValue(rs.result);
      }
    }
  }

  createForm(){
    this.myForm=this.fb.group({
      empId: [null, [GlobalValidate.required({ error: 'Họ và tên không được để trống' })]],
      posId: [null],
      roleName: [null, [GlobalValidate.required({ error: 'Vai trò không được để trống' })]],
      projId: [null, [GlobalValidate.required({ error: 'Dự án không được để trống' })]],
      beginDate: [null, [GlobalValidate.required({ error: 'Ngày bắt đầu không được để trống' })]],
      endDate: [null, [GlobalValidate.required({ error: 'Ngày kết thúc không được để trống' })]],
      percentResource: [null],
      note: [null,[GlobalValidate.MaxLength(2000,{error:'Ghi chú không được quá 2000 ký tự'})]],
      relatedList: [null]
    });
    if (this.isView) {
      this.myForm.disable();
    }
  }

  async getEmployee() {
    this.listEmployee = [];
    const rs = await this.employeesService.get({page:1, size: 100 });
    console.log(rs.result);

    if (rs.ok) {
      this.listEmployee = rs.result.data.map(x => {
        return {
          id: x.id,
          name: x.basic.fullName
        }
      })
    }
  }

  async getPosition() {
    this.listPosition = [];
    let poi = await this.positionService.get({});
    if (poi.ok) {
      console.log(poi.result);

      this.listPosition = poi.result.data.map(x => {
        return {
          id: x.id,
          name: x.data.positionName
        }
      });
    }
  }

  async getJobPosition() {
    this.listJobPosition = [];
    let poi = await this.jobPositionService.get({});
    if (poi.ok) {
      this.listJobPosition = poi.result.data.map(x => {
        return {
          id: x.id,
          name: x.data.jobName
        }
      });
    }
  }

  async getProject() {
    this.listProject = [];
    const rs = await this.projectService.get({ size: 200 });
    if (rs.ok) {
      this.listProject = rs.result.data.map(x => {
        return {
          id: x.id,
          name: x.projName
        };
      });
    }
  }

  async submit(close=true) {
    super.submitForm();
    this.myForm.get('note').setValue(this.myForm.get('note').value?this.myForm.get('note').value.trim():null);
    if (this.myForm.invalid) { return; }
    const body: any = this.myForm.value;
    this.isLoading = true;
    let result: any;
   
      const rs =(this.id)? await this.sv.edit(this.id as number, body):await this.sv.add(body);
      this.isLoading = false;
      if (rs.ok) {
        result = rs.result;
        close?this.handleOk(result):this.addNew(result);
        this.successMessage('success', 'Lưu dữ liệu thành công');
      } else {
        this.errorMessage('Lỗi', 'Lưu thất bại');
      }
    
  }

addNew(result:any){
  this.myForm.reset( );
  this.handleAdd(result);
}

  successMessage(type: string, text: string): void {
    this.message.create(type, text);
  }

  errorMessage(type: string, text: string): void {
    this.message.create(type, text);
  }

}
