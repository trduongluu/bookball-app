import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { ProjectGeneralService } from '../../_shared/services/project-general.service';
import { EmployeesService } from '../../_shared/services/employees.service';
import { ProjectWorkService } from '../../_shared/services/project-work.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActualCostsService } from 'src/app/_shared/services/actual-costs.service';
import { RevenuesService } from 'src/app/_shared/services/revenues.service';
import { ProjectResourceService } from 'src/app/_shared/services/project-resource.service';
import { JobPostionService } from 'src/app/_shared/services/job-postion.service';


declare let $;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  public myForm: FormGroup;
  public paging: any = {
    page: 1,
    size: 5
  };
  showDialog = false;
  paramsDialog: any = {};
  isDialogLoading = false;
  public listOfData: any[] = [];

  public lstEmp: any; // danh sach nguon luc --> dang de
  public lstEmp1: any[] = []; // danh sach nguon luc
  public data: any;
  public dataCV: any[] = []; // data công việc Duc anh
  public dataAC: any[] = []; // data chi phi NA
  public dataRV: any[] = []; // data doanh thu NA
  public openProject: number = null;
  public id: any;
  constructor(
    private modalService: NzModalService,
    private sv: ProjectResourceService,
    private projService: ProjectGeneralService,
    private EmpService: EmployeesService,
    private ActualCostsService: ActualCostsService,
    private revenuesService: RevenuesService,
    private projWorkService: ProjectWorkService,
    private jobPositionService: JobPostionService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.getProject();
    this.getEmp();
    this.getActualCost();
    this.getData();
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit home');
  }
  createForm() {
    this.myForm = this.fb.group({
      searchStatus: [null],
      // openprojwork: '',
    });
  }
  createDialog() {
    this.paramsDialog.mode = 1;
    this.paramsDialog.id = null;
    this.showDialog = true;
  }

  editDialog(item: any) {
    this.paramsDialog.mode = 2;
    this.paramsDialog.id = item.id;
    this.showDialog = true;
  }

  viewDialog(item: any) {
    this.paramsDialog.mode = 3;
    this.paramsDialog.id = item.id;
    this.showDialog = true;
  }

  deleteDialog(item: any) {
    this.modalService.confirm({
      nzTitle: '<i>Do you Want to delete these items?</i>',
      nzContent: '<b> </b>',
      nzOnOk: () => console.log('OK')
    });
  }

  closeDialog(): void {
    this.showDialog = false;
  }

  submitDialog(data): void {
    this.showDialog = false;
  }

  async getProject() {

    const rs = await this.projService.get(this.paging);
    console.log('du an NA', rs.result.data);
    if (rs.ok) {
      this.listOfData = rs.result.data;
      if (this.listOfData.length > 0) {
        this.openProject = this.listOfData[0].id;
      }
    }
  }

  async getEmp() {
    const emp = await this.EmpService.get({});
    this.lstEmp = emp.result.data;
    console.log('Emp', this.lstEmp);

  }
  async getActualCost() {
    const rs = await this.ActualCostsService.get({});
    console.log('chi phi', rs.result.data);
  }


  async getData(id = null) {
    this.lstEmp1 = [];
    const param = (id) ? { where: { projGeneralId: id } } : { size: 4 };
    const param1 = { where: { and: [] } };
    const param2 = { where: { and: [] } };
    const rs = await this.projWorkService.get(param);
    if (!!id) {
      param1.where.and.push({ 'data.projectId': +id });
      param2.where.and.push({ projId: +id });
      console.log('g', param1);
      const rscost = await this.ActualCostsService.get(param1); // chi phi

      const rsrv = await this.revenuesService.get(param1); // doanh thu
      console.log('param2', param2);
      const rsem = await this.sv.get(param2); // nguon luc

      console.log('nguồn lực', rsem);
      this.dataAC = rscost.result.data;
      this.dataRV = rsrv.result.data;
      console.log('doanh thu', this.dataRV);

      rsem.result.data.forEach(async x => {
        const employee = await this.EmpService.findOneById(x.empId);
        x.empName = (employee.ok && employee.result) ? employee.result.basic.fullName : '';
        const position = await this.EmpService.findOneById(x.posId);
        x.poiName = (position.ok && position.result) ? position.result.data.positionName : '';
        const jobPosition = await this.jobPositionService.findOneById(x.posId);
        x.jobName = (jobPosition.ok && jobPosition.result) ? jobPosition.result.data.jobName : '';
        this.lstEmp1.push(x);

      });
    }
    if(rs.ok){
    this.dataCV = rs.result.data;
    }
    console.log('danh sach nhan vien', this.lstEmp1);
    console.log('cong viec', this.dataCV);
    console.log('chi phi', this.dataAC);


  }
  setClassPercent(value: number) {
    const className = value > (100 / 3 * 2) ? 'bg-success' : ((value <= (100 / 3)) ? 'bg-danger' : 'bg-orange-300');
    return className;
  }

  async setProject(id: number) {
    this.openProject = id;
    this.getData(id);
  }
}

