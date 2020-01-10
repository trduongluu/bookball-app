
import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ElementRef, HostListener, Directive } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExtensionService } from '../../../_base/services/extension.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalValidate } from '../../../_base/class/global-validate';
import { ProjectGeneralService } from '../../../_shared/services/project-general.service';
import { EmployeesService } from '../../../_shared/services/employees.service';
import { BaseDataComponent } from '../../../_base/components/base-data-component';
import { ProjectGroupService } from '../../../_shared/services/project-group.service';
import { TargetService } from '../../../_shared/services/target.service';
import { ProductServicesService } from '../../../_shared/services/product-services.service';
import { NzMessageService, zh_CN } from 'ng-zorro-antd';
import { ProjectTypeService } from '../../../_shared/services/project-type.service';
import { PartnerService } from '../../../_shared/services/partner.service';
import { InvestsService } from '../../../_shared/services/invests.service';
import { ProjectWorkService } from '../../../_shared/services/project-work.service';
import { ExtentionTableService } from '../../../_base/services/extention-table.service';
import { CrService } from '../../../_shared/services/cr.service';
import { IssueService } from '../../../_shared/services/issue.service';
import { ManagementFormService } from '../../../_shared/services/management-form.service';
import { BiddingService } from '../../../_shared/services/bidding.service';
import { StatusService } from '../../../_shared/services/status.service';
import { PartnerGroupService } from '../../../_shared/services/partner-group.service';
import { TargetDetailService } from '../../../_shared/services/target-detail.service';
import { CurrencyService } from '../../../_shared/services/currency.service';
import { ActualCostsService } from '../../../_shared/services/actual-costs.service';
import { ExpectedCostsService } from '../../../_shared/services/expected-costs.service';
import { CollateCostsService } from '../../../_shared/services/collate-costs.service';
import { BizModelService } from '../../../_shared/services/biz-model.service';
import { ContractsService } from '../../../_shared/services/contracts.service';
import { CompanyService } from '../../../_shared/services/company.service';
import { RevenuesService } from '../../../_shared/services/revenues.service';
import { PackageBidsService } from '../../../_shared/services/package-bids.service';
import { ProjectResourceService } from '../../../_shared/services/project-resource.service';
import { PositionService } from '../../../_shared/services/position.service';
import { JobPostionService } from '../../../_shared/services/job-postion.service';
import { Utilities } from '../../../_shared/extensions/utilities';
@Component({
  selector: 'app-project-general-data',
  templateUrl: './project-general-data.component.html',
  styleUrls: ['./project-general-data.component.scss']
})
export class ProjectGeneralDataComponent extends BaseDataComponent implements OnInit {
  isVisibleCR = false;
  isVisibleProjWork = false;
  isVisible = false;
  isConfirmLoading: boolean;
  disabled: boolean;
  isVisibleIssue: boolean;


  constructor(
    fb: FormBuilder,
    private ar: ActivatedRoute,
    private ex: ExtensionService,
    // tslint:disable-next-line: variable-name
    public exTableService: ExtentionTableService,
    private rt: Router,
    private projGroupService: ProjectGroupService,
    private projGeneralService: ProjectGeneralService,
    private employeeService: EmployeesService,
    private targetService: TargetService,
    private productService: ProductServicesService,
    private el: ElementRef,
    private message: NzMessageService,
    private projectType: ProjectTypeService,
    private partnerService: PartnerService,
    private investsService: InvestsService,
    private projWorkService: ProjectWorkService,
    private crService: CrService,
    private issueService: IssueService,
    private statusService: StatusService,
    private managementService: ManagementFormService,
    private biddingService: BiddingService,
    private partnergroupService: PartnerGroupService,
    private TargetDetailsService: TargetDetailService,
    private CurrencyService: CurrencyService,
    private actualCostsService: ActualCostsService,
    private expectedCostsService: ExpectedCostsService,
    private collateCostService: CollateCostsService,
    private revenuesService: RevenuesService,
    private bizModelService: BizModelService,
    private contractsService: ContractsService,
    private compService: CompanyService,
    private packageBidsService: PackageBidsService,
    private projectResourceService: ProjectResourceService,
    private positionService: PositionService,
    private jobPositionService: JobPostionService,

  ) { super(fb); }
  // tslint:disable-next-line: no-input-rename
  @Input('data') data: any;

  panelss = [{
    active: true,
    name: 'Thông tin cơ bản',

  }
  ];
  panels = [{
    active: false,
    name: 'Tổ chức dự án',

  }
  ];
  panels1 = [{
    active: false,
    name: 'Thiết lập',

  }
  ];
  panels2 = [{
    active: false,
    name: 'Tài chính',

  }
  ];
  public paging: any = {
    page: 3,
    size: 15
  };
  public dataBids: any;
  public isLoad = true;
  public isView: boolean;
  public link: string;
  public myForm: FormGroup;
  public isSubmit: boolean;
  public settingData: any;
  public tag: any = 'thong-tin-chung';
  public userData: any;
  private sub: any;
  private sub2: any;
  public idEdit;
  public lstProjectType: any[];
  public lstPartners: any[];
  public lstPartners2: any[];
  public lstPartnerGroup: any[];
  public lstProjGroup: any[];
  public proj: any;
  public grProj: any;
  public listStatus: any[];
  public lstpb: any[];
  public lstprojres: any;
  public listTarget: any[];
  public lstBidding: any[];
  public lstProSer: any[];
  public lstInvest: any[];
  public lstMana: any[];
  public lstEmp: any[];
  public lstCurrency: any[];
  public lstProduct: any[];
  public lstService: any[];
  public openTab = 1;
  public lstBiz: any[];
  public id: number;
  public dataCR: any;
  public dataIs: any;
  public dataAC: any;
  public dataEC: any;
  public dataCC: any;
  public dataRevenues: any;
  public lstContracts: any;
  listOfData: any[];
  lstprojwork: any[];
  public crdata: boolean;
  lstTarDel: any[];
  public partners: any[];
  public lstBudget = [{
    id: 1,
    name: 'Trong ngân sách'
  },
  {
    id: 2,
    name: 'Ngoài ngân sách'
  },
  {
    id: 3,
    name: 'Trong và ngoài ngân sách'
  }
  ]
  public listCurrency = [{
    id: 'VND',
    name: 'VND'
  }, {
    id: 'USD',
    name: 'USD'
  }, {
    id: 'EUR',
    name: 'EUR'
  }, {
    id: 'JP',
    name: 'JP'
  }, {
    id: 'GBP',
    name: 'GBP'
  }];
  public lstPriority = [
    {
      id: 'Rất cao',
      name: 'Rất cao'
    },
    {
      id: 'Cao',
      name: 'Cao'
    },
    {
      id: 'Trung bình',
      name: 'Trung bình'
    },
    {
      id: 'Thấp',
      name: 'Thấp'
    },
    {
      id: 'Rất thấp',
      name: 'Rất thấp'
    }
  ]
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions = [];



  async ngOnInit() {
    this.createForm();
    this.getStatus();
    this.getlstProjType();
    this.getTargetDetails();
    this.getPartners();
    this.getProjGroup();
    this.getProduct();
    this.getService();
    this.getPartnerGroup();
    this.getInvestment();
    this.getManagement();
    this.getBidding();
    this.getEmployee();
    this.projWork();
    this.projCR();
    this.projIssue();
    this.getCompany();
    this.getBiz();
    this.getactualCost();
    this.getCC();
    this.getEC();
    this.getReven();
    this.getContracts();
    this.getPackageBids();
    this.getProjResource();
    this.createProjCode();
    this.openTab = 1;
    await this.getData();
  }

  createForm() {
    this.myForm = this.fb.group({

      projTypeId: [{ value: null, disabled: this.isView }, [GlobalValidate.required({ error: 'Không được để trống' })]], // mã loại dự án
      projCode: [{ value: null, disabled: this.isView }, [GlobalValidate.required({ error: 'Không được để trống' })]], // mã dự án
      projName: [{ value: null, disabled: this.isView }, [GlobalValidate.required({ error: 'Không được để trống' })]], // tên dự án
      beginDate: [Utilities.DateNowUTC()], // ngày bắt đầu
      // tslint:disable-next-line: max-line-length
      endDate: [Utilities.DateNowUTC()], // ngày kết thúc dự kiến
      completedDate: [{ value: null, disabled: this.isView }], // ngày hoàn thành thực tế
      statusId: [{ value: null, disabled: this.isView }, [GlobalValidate.required({ error: 'Không được để trống' })]], // id trạng thái
      projPercent: [{ value: null, disabled: this.isView }], // % hoàn thành
      pmName: [{ value: null, disabled: this.isView }], // trưởng dự án
      content: [{ value: null, disabled: this.isView }], // nội dung
      allowEmail: [true], // cho phép gửi mail thông báo
      directorProject: [{ value: null, disabled: this.isView }], // Giám đốc dự án
      cmo: [{ value: null, disabled: this.isView }], // CMO
      amProject: [{ value: null, disabled: this.isView }], // AM
      projectMembers: [{ value: null, disabled: this.isView }], // thành viên dự án
      coordinatorDep: [{ value: null, disabled: this.isView }], // đơn vị phối hợp
      coordinatorProject: [{ value: null, disabled: this.isView }], // điều phối dự án
      partnerId: [{ value: null, disabled: this.isView }], // id dối tác
      partGroupId: [{ value: null, disabled: this.isView }], // id nhóm đối tác
      projgroupId: [{ value: null, disabled: this.isView }], // id nhóm dự án
      projPriority: [{ value: 0, disabled: this.isView }], // ưu tiên
      learderName: [{ value: null, disabled: this.isView }], // tên lãnh đạo
      targetId: [{ value: null, disabled: this.isView }], // id mục tiêu
      mntFormId: [{ value: null, disabled: this.isView }], // hình thức quản lý
      investsId: [{ value: null, disabled: this.isView }], // hình thức đầu tư
      biddingId: [{ value: null, disabled: this.isView }], // lĩnh vực đấu thầu
      bizModId: [{ value: null, disabled: this.isView }, [GlobalValidate.required({ error: 'Không được để trống' })]],// Loại hình kinh doanh
      servId: [{ value: null, disabled: this.isView }, [GlobalValidate.required({ error: 'Không được để trống' })]], // dịch vụ
      prodId: [{ value: null, disabled: this.isView }, [GlobalValidate.required({ error: 'Không được để trống' })]], // sản phẩm
      empId: [{ value: null, disabled: this.isView }], // trợ lý
      depId: [{ value: null, disabled: this.isView }], // đơn vị triển khai
      budgetId: [{ value: null, disabled: this.isView }], // ngân sách
      currency: ['VND'],// loại tiền tệ
      exchangeRate: [{ value: null, disabled: this.isView }], // tỷ giá
      estimatedBudget: [{ value: null, disabled: this.isView }], // ngân sách dự toán
      proposedBudget: [{ value: null, disabled: this.isView }], // ngân sách đề xuất
      planBudget: [{ value: null, disabled: this.isView }], // ngân sách kế hoạch
      crbudget: [{ value: null, disabled: this.isView }], // ngân sách CR
      feasibilityStadyBudget: [{ value: null, disabled: this.isView }], // ngân sách nghiên cứu khả thi
      feasibilityCrbudget: [{ value: null, disabled: this.isView }], // ngân sách nghiên cứu khả thi cho CR
      totalCostContract: [{ value: null, disabled: this.isView }], // tổng tiền HĐ
      totalContractExpenses: [{ value: null, disabled: this.isView }], // tổng chi HĐ
      budgetRemaining: [{ value: null, disabled: this.isView }], // ngân sách còn chi
      totalContractAmount: [{ value: null, disabled: this.isView }], // tổng tiền hợp đồng
      totalContractPayment: [{ value: null, disabled: this.isView }], // toongt chi hợp đồng
      totalContractRemaining: [{ value: null, disabled: this.isView }], // tổng còn chi hợp đồng
      totalOperatingExpenses: [{ value: null, disabled: this.isView }], // tổng chi cho hoạt động
      costBooks: [{ value: null, disabled: this.isView }], // chi phí đã book
      salesPlan: [{ value: null, disabled: this.isView }], // doanh số kế hoạch
      note: [{ value: null, disabled: this.isView }], // ghi chú
      memory: [{ value: null, disabled: this.isView }],// ghi nhớ
      customerGroupId: [{ value: null, disabled: this.isView }, [GlobalValidate.required({ error: 'Không được để trống' })]], // nhóm khách hàng
      customerId: [{ value: null, disabled: this.isView }, [GlobalValidate.required({ error: 'Không được để trống' })]], // khách hàng
    });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    // this.sub.subscribe();
    // this.sub2.subscribe();
  }

  async createProjCode() {
    if (!this.id) {
      let form = this.myForm.value;
      let proj = await this.projGeneralService.count({});
      let count = proj.result + 1;
      let year = form.beginDate ? new Date(form.beginDate).getFullYear() : '';
      let customer = form.customerId ? await this.partnerService.findOneById(form.customerId) : null;
      let customerId = customer ? customer.result.data.partCode : '';
      let bizMod = form.bizModId ? await this.bizModelService.findOneById(form.bizModId) : null;
      let biz = bizMod ? bizMod.result.data.bizModeCode : '';
      let prod = form.prodId ? await this.productService.findOneById(form.prodId) : null;
      let product = prod ? prod.result.data.prodServCode : '';
      let serv = form.servId ? await this.productService.findOneById(form.servId) : null;
      let service = serv ? serv.result.data.prodServCode : '';
      this.myForm.get('projCode').setValue(`${customerId ? customerId : ''}${biz}${product}${service}${year ? year.toString().substr(2, 2) : ''}${count < 100 ? ('0' + count) : count}`);

    }
  }

  showModalPwork() {
    this.isVisibleProjWork = true;
  }
  showModalCR() {
    this.isVisibleCR = true;
  }
  showModalIssue() {
    this.isVisibleIssue = true;
  }
  cancelCR() {
    this.isVisibleCR = false;
  }
  cancelIssue() {
    this.isVisibleIssue = false;
  }
  openModal(item: any = null) {
    this.idEdit = null;
    this.myForm.reset();
    if (item) {

      this.idEdit = item.id;
      this.myForm.patchValue(item);
    }
  }
  async getlstProjType() {
    this.lstProjectType = [];
    const rs = await this.projectType.get({ page: 1, size: 100 });

    if (rs.ok) {
      this.lstProjectType = rs.result.data.map(x => {
        return {
          id: x.id,
          name: x.data.projTypeNameVn
        };
      });
    }

  }
  async getData() {
    if (this.id) {
      const rs = await this.projGeneralService.findOneById(this.id);
      console.log('giatriform', rs.result);

      if (rs.ok) {
        this.myForm.patchValue(rs.result);
        await this.updateProject(true);
        await this.updateProject2(true);
        await this.updateCostContract();
        await this.updateContractAmount();
      }

    }
  }
  resetValidateDate(controlName: string) {
    this.myForm.get(controlName).setValidators(null);
    this.myForm.updateValueAndValidity();
  }
  updateStatus() {
    let form = this.myForm.value;
    if (form.statusId === 1061) {
      // this.myForm.get('endDate').setValue(100);
      this.myForm.get('projPercent').setValue(100);
      this.myForm.get('completedDate').setValue(Utilities.DateNowUTC());
    }
    else {
      this.myForm.get('projPercent').setValue(0);
      this.myForm.get('completedDate').setValue(null);
    }
  }
  // trạng thái hoàn thành

  async updateProject(isInit: boolean = false) {
    this.lstPartners = [];

    const partGroupId = this.myForm.get('partGroupId').value;
    if (!isInit) {
      this.myForm.get('partnerId').setValue(null);
    }
    if (partGroupId) {
      const rs = await this.partnerService.get({ where: { "data.idPartGroup": partGroupId } });
      if (rs.ok) {
        this.lstPartners = rs.result.data.map(x => {
          return {
            id: x.id,
            name: x.data.partnerNameVn
          };
        })
      }
    }
  }
  async updateProject2(isInit: boolean = false) {
    this.lstPartners2 = [];
    const customerGroupId = this.myForm.get('customerGroupId').value;
    if (!isInit) {
      this.myForm.get('customerId').setValue(null);
    }
    if (customerGroupId) {

      const rs = await this.partnerService.get({ where: { "data.idPartGroup": customerGroupId } });
      if (rs.ok) {
        // this.myForm.get('customerId').reset();
        this.lstPartners2 = rs.result.data.map(x => {
          return {
            id: x.id,
            name: x.data.partnerNameVn
          };
        })
      }
    }


  }
  async projWork() {
    const param = { where: { projGeneralId: this.id } };
    const rs = await this.projWorkService.get(param);
    this.data = rs.result.data;


  }

  async projCR() {
    const param = { where: { projId: this.id } };
    const rs = await this.crService.get(param);
    this.dataCR = rs.result.data;


  }

  async projIssue() {
    const param = { where: { projId: this.id } };
    const rs = await this.issueService.get(param);
    this.dataIs = rs.result.data;


  }

  async getactualCost() {
    this.dataAC = [];

    const param = { where: { "data.projectId": this.id } };
    const rs = await this.actualCostsService.get(param);
    this.dataAC = rs.result.data;


  }
  async getEC() {
    this.dataEC = [];
    const param = { where: { "data.projectId": this.id } };
    const rs = await this.expectedCostsService.get(param);
    this.dataEC = rs.result.data;
  }

  async getCC() {
    this.dataCC = [];
    const param = { where: { "data.projectId": this.id } };
    const rs = await this.collateCostService.get(param);
    this.dataCC = rs.result.data;
  }

  async getReven() {
    if (this.id) {
      this.dataRevenues = [];
      const param = { where: { "data.projectId": this.id } };
      const rs = await this.revenuesService.get(param);
      if (rs.ok) {
        this.dataRevenues = rs.result.data;
      }
    }

  }

  //lấy hợp đồng
  async getContracts() {
    if (this.id) {
      this.lstContracts = [];
      const param = { where: { "projId": this.id } };
      const rs = await this.contractsService.get(param);
      if (rs.ok) {
        this.lstContracts = rs.result.data;
      }

    }
  }
  //lấy nguồn lực kế hoạch
  async getProjResource() {
    if (this.id) {
      this.lstprojres = [];
      const param = { where: { "projId": this.id } };
      const rs = await this.projectResourceService.get(param);
      if (rs.ok) {
        this.lstprojres = rs.result.data;
        rs.result.data.forEach(async x => {
          let employee = await this.employeeService.findOneById(x.empId);
          x.empName = (employee.ok && employee.result) ? employee.result.basic.fullName : '';
          let position = await this.positionService.findOneById(x.posId);
          x.poiName = (position.ok && position.result) ? position.result.data.positionName : '';
          let jobPosition = await this.jobPositionService.findOneById(x.posId);
          x.jobName = (jobPosition.ok && jobPosition.result) ? jobPosition.result.data.jobName : '';
          const item = {
            projId: x.projId,
            projName: x.proj ? x.proj.projName : '',
            isShow: true,
            projResource: [x]
          };
          const index = this.data.findIndex(i => i.projId === x.projId);
          index === -1 ? this.data.push(item) : this.data[index].projResource.push(x);
        })
      }
      console.log('nguonluckehoach', this.lstprojres);

    }
  }
  //lấy gói thầu
  async getPackageBids() {
    if (this.id) {
      this.dataBids = [];
      const param = { where: { "projId": this.id } };
      const rs = await this.packageBidsService.get(param);
      if (rs.ok) {
        this.dataBids = rs.result.data;
      }
    }
  }
  async updateCostContract() {
    let tt = 0; //chi phí thực hiện
    if (this.id) {
      const param = { where: { "data.projectId": this.id } };
      const rs = await this.actualCostsService.get(param);
      rs.result.data.forEach(x => {
        tt += x.data.amountReceived;

      });

    }
    this.myForm.get('totalCostContract').setValue(tt);
    this.myForm.get("budgetRemaining").setValue(this.myForm.get("estimatedBudget").value - tt);
  }


  async updateContractAmount() {
    let tt = 0; // tổng tiền hợp hồng
    if (this.id) {
      const param = { where: { "projId": this.id } };
      const rs = await this.contractsService.get(param);
      rs.result.data.forEach(x => {
        tt += x.contractValue;
      });
      this.myForm.get('totalContractAmount').setValue(tt);

    }
  }

  // async updateProjPercent() {
  //   const param = { where: { and: [{ projGeneralId: this.id }] } };
  //   const rs = await this.projWorkService.get(param);
  //   this.data = rs.result.data;

  //   var tongtren = 0;
  //   var tongduoi = 0;
  //   console.log('congviec', this.data);
  //   rs.result.data.forEach(x => {
  //     // tính số ngày của từng công việc
  //     var date1 = new Date(x.beginDate);
  //     var date2 = new Date(x.endDate);

  //     var abc = date2.getTime() - date1.getTime();
  //     var SoNgay = abc / (1000 * 3600 * 24);
  //     console.log('Songay', SoNgay);

  //     // tính %cv nhân số ngày cv
  //     var tonghoanthanh = (x.workCompleted / 100) * SoNgay;
  //     console.log('abc', tonghoanthanh);

  //     tongtren += tonghoanthanh;
  //     tongduoi += SoNgay;
  //     console.log('tongtren', tongtren);


  //   });
  //   var ketqua = (tongtren / tongduoi) * 100;
  //   this.myForm.get('projPercent').setValue(ketqua);
  // }
  async getCompany() {
    this.lstpb = [];
    const param = { where: { and: [{ 'typeId': 2 }, { 'dataDb.status': 1 }, { 'parentId': 1080 }] } };
    const res = await this.compService.get(param);
    if (res.ok) {
      this.lstpb = res.result.data.map(x => {
        return {
          id: x.id,
          name: x.companyName
        }
      })
    }


  }
  async getBiz() {
    this.lstBiz = [];
    const res = await this.bizModelService.get({});
    if (res.ok) {
      this.lstBiz = res.result.data.map(x => {
        return {
          id: x.id,
          name: x.data.bizModeNameVn
        }
      })
    }
  }

  async getPartners() {
    const res = await this.partnerService.get({});
    this.partners = res.result.data;
  }
  changedata() {

    this.partners.forEach(x => {
      // tslint:disable-next-line: triple-equals
      if (x.id == this.myForm.get('customerId').value) {
        this.myForm.patchValue({ learderName: x.data.contact });


      }

    });

  }


  async getProjGroup() {
    this.lstProjGroup = [];
    const rs = await this.projGroupService.get({});
    if (rs.ok) {
      rs.result.data.forEach(item => {

        this.lstProjGroup.push({
          id: item.id,
          name: item.data.projGroupNameVN
        });
      });

    }

  }
  // nhóm sản phẩm
  async getProduct() {
    this.lstProduct = [];
    const param = { where: { and: [{ 'data.prodServ': 1 }, { 'dataDb.status': 1 }] } };
    const rs = await this.productService.get(param);
    if (rs.ok) {
      rs.result.data.forEach(item => {

        this.lstProduct.push({
          id: item.id,
          name: item.data.prodServNameVN
        });
      });

    }
  }


  async getService() {
    this.lstService = [];
    const param = { where: { and: [{ 'data.prodServ': 2 }, { 'dataDb.status': 1 }] } };
    const rs = await this.productService.get(param);
    if (rs.ok) {
      rs.result.data.forEach(item => {

        this.lstService.push({
          id: item.id,
          name: item.data.prodServNameVN
        });
      });

    }
  }
  async getTargetDetails() {
    this.listTarget = [];
    const param = { where: { and: [{ 'data.idtarget': null }] } };

    const rs = await this.TargetDetailsService.get(param);
    if (rs.ok) {
      rs.result.data.forEach(item => {
        this.listTarget.push({
          id: item.id,
          name: item.data.targetDetailNameVn,
        });
      });
    }
  }

  async getEmployee() {
    this.lstEmp = [];
    const emp = await this.employeeService.get({});
    if (emp.ok) {
      emp.result.data.forEach(item => {
        this.lstEmp.push({
          id: item.id,
          name: item.basic.fullName
        });


      });
    }
  }
  async getStatus() {
    this.listStatus = [];

    const param = { where: { and: [{ 'data.statusType': 1055 }, { 'dataDb.status': 1 }] } };
    const status = await this.statusService.get(param);

    if (status.ok) {
      status.result.data.forEach(item => {
        this.listStatus.push({
          id: item.id,
          name: item.data.statusName
        });
      });
    }
    console.log('status', this.listStatus);

  }

  async getPartnerGroup() {
    this.lstPartnerGroup = [];
    const ptg = await this.partnergroupService.get({});
    if (ptg.ok) {
      ptg.result.data.forEach(item => {
        this.lstPartnerGroup.push({
          id: item.id,
          name: item.data.partnerGroupNameVn

        });
      });
    }

  }


  async getInvestment() {
    this.lstInvest = [];
    const rs = await this.investsService.get({ page: 1, size: 100 });
    if (rs.ok) {
      rs.result.data.forEach(item => {
        this.lstInvest.push({
          id: item.id,
          name: item.data.investName
        });
      });
    }


  }
  async getManagement() {
    this.lstMana = [];
    const rs = await this.managementService.get({ page: 1, size: 100 });

    if (rs.ok) {
      rs.result.data.forEach(item => {
        this.lstMana.push({
          id: item.id,
          name: item.data.mntFormName
        });
      });
    }
  }

  async getBidding() {
    this.lstBidding = [];
    const bidd = await this.biddingService.get({ page: 1, size: 100 });

    if (bidd.ok) {
      bidd.result.data.forEach(item => {
        this.lstBidding.push({
          id: item.id,
          name: item.data.biddingName
        });
      });
    }

  }
  async submit() {
    super.submitForm();
    if (this.myForm.invalid) { return; }

    // tslint:disable-next-line: max-line-length
    const rs = ((!this.id) ? await this.projGeneralService.add(this.myForm.value) : await this.projGeneralService.edit(this.id, this.myForm.value));
    if (rs.ok) {
      this.message.success('Lưu thành công');
      this.id = rs.result.id;
      this.handleOk(rs.result);
    } else { this.message.success('Lỗi! Lưu thất bại'); }
    console.log('giatrine', this.myForm.value);

  }
  // handleOk(result: any) {
  //   throw new Error("Method not implemented.");
  // }

  closeDataModal(value: any) {
    if (!!value) {
      this.getData();
    }
    this.isVisibleProjWork = false;
    this.isVisibleCR = false;
    this.isVisibleIssue = false;

  }

}
