import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/_base/services/dialog.service';
import { ExtensionService } from 'src/app/_base/services/extension.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BaseListComponent } from 'src/app/_base/components/base-list-component';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProjectResourceService } from 'src/app/_shared/services/project-resource.service';
import { PositionService } from 'src/app/_shared/services/position.service';
import { EmployeesService } from 'src/app/_shared/services/employees.service';
import { JobPostionService } from 'src/app/_shared/services/job-postion.service';

@Component({
  selector: 'app-project-resource',
  templateUrl: './project-resource.component.html',
  styleUrls: ['./project-resource.component.scss']
})
export class ProjectResourceComponent extends BaseListComponent implements OnInit {

  public myForm: FormGroup;
 public data:any[];
  constructor(
    private dl: DialogService,
    private sv: ProjectResourceService,
    private ex: ExtensionService,
    public exTableService: ExtentionTableService,
    public extentionTableService: ExtentionTableService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private employeesService: EmployeesService,
    private positionService:PositionService,
    private jobPositionService:JobPostionService,
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

  async getData(page: number = 1) {
    this.data=[];
    this.paging.page = page;
    const where = { and: [] };
    this.paging.order =[{ id: false },{projId:false}];
    const formSearch = this.myForm.value;

    // create data query where
    if (formSearch.txtSearch) {
      if (!isNaN(+formSearch.txtSearch)) {
        where.and.push({
          or: [
            { 'data.empId': { like: this.ex.BoDau(formSearch.txtSearch) } },
            { 'data.posId': { like: this.ex.BoDau(formSearch.txtSearch) } },
            { 'data.projId': { like: this.ex.BoDau(formSearch.txtSearch) } },
          ]
        });
      } else {
        where.and.push({
          or: [
            { 'data.roleName': { like: this.ex.BoDau(formSearch.txtSearch) } },
            { 'data.profileNameVn': { like: this.ex.BoDau(formSearch.txtSearch) } },
          ]
        });
      }
    }

    // if (formSearch.status !== null) {
    //   where.and.push({ 'dataDb.status': formSearch.status });
    // } else {
    //   where.and.push({ or: [{ 'dataDb.status': 0 }, { 'dataDb.status': 1 }] });
    // }

    if (where.and.length > 0) { this.paging.where = where; }

    this.isLoading = true;
    const rs = await this.sv.get(this.paging);
  

    this.ex.logDebug('getData', rs);
    if (rs.ok) {
      this.listOfData= rs.result.data;
       rs.result.data.forEach(async x=>{
         let employee= await this.employeesService.findOneById(x.empId);
         x.empName=(employee.ok && employee.result)?employee.result.basic.fullName:'';
         let position= await this.positionService.findOneById(x.posId);
         x.poiName=(position.ok && position.result)? position.result.data.positionName:'';
         let jobPosition= await this.jobPositionService.findOneById(x.posId);
         x.jobName=(jobPosition.ok && jobPosition.result)? jobPosition.result.data.jobName:'';
        const item = {
          projId: x.projId,
          projName: x.proj ? x.proj.projName : '',
          isShow: true,
          projResource: [x]
        };
        const index = this.data.findIndex(i => i.projId === x.projId);
        index === -1 ? this.data.push(item): this.data[index].projResource.push(x);
      });
      console.log(this.data);
      
      this.paging = rs.result.paging;
     
    }
    this.isLoading = false;
    this.refreshStatus();
  }

  async deleteDialog(item: any) {
    console.log('delete id', item.id);
    const result = await this.dl.confirm('<i>Bạn có muốn xóa dữ liệu này không?</i>', '<b> </b>');
    if (result) {
      const rs = await this.sv.delete(item.id);
      this.ex.logDebug('Delete response', rs);
      if (rs.ok) {
        this.getData();
        this.deleteMessage();
      }
    }
  }

  async deleteMulti() {
    let i = this.exTableService.getitemSelected(this.listOfData).length;
    const result = await this.dl.confirm(`Bạn có muốn xóa ${i > 1 ? 'những' : ''} dữ liệu này không?`, ' ');
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
    else{
      this.exTableService.unselectAll(this.listOfData);
    }
  }

  async updateStatus(item: any, status: number) {
    const changeVal = 1 - status;
    const rs = await this.sv.patch(item.id, { dataDb: { status: changeVal } });
    if (rs.ok) {
      item.dataDb.status = changeVal;
      item.isHidden = !!!item.isHidden;
    } else {
      this.dl.error('Lỗi hệ thống', 'Dữ liệu của bạn không cập nhật thành công do lỗi hệ thống');
    }
  }

  deleteMessage() {
    this.message.success("Xóa dữ liệu thành công");
  }

  setClassPercent(value: number) {
    const className = value > (100 / 3 * 2) ? 'bg-success' : ((value <= (100 / 3)) ? 'bg-danger' : 'bg-orange-300') ;
    return className;
  }
}
