import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { BaseDataComponent } from '../../../../_base/components/base-data-component';
import { GlobalValidate } from '../../../../_base/class/global-validate';
import { CollateCostsService } from '../../../../_shared/services/collate-costs.service';
import { StatusService } from '../../../../_shared/services/status.service';
import { CurrencyService } from '../../../../_shared/services/currency.service';
import { ProjectGeneralService } from '../../../../_shared/services/project-general.service';
import { PartnerService } from '../../../../_shared/services/partner.service';
import { EmployeesService } from '../../../../_shared/services/employees.service';
import { ContractsService } from '../../../../_shared/services/contracts.service';
import { PaymentScheduleService } from '../../../../_shared/services/payment-schedule.service';
import { PaymentTypeService } from '../../../../_shared/services/payment-type.service';
import { PackageBidsService } from 'src/app/_shared/services/package-bids.service';
import { ScrollService } from 'src/app/_base/services/scroll.service';
import { ExpensesItemService } from 'src/app/_shared/services/expenses-item.service';
import { isBoolean } from 'util';
import { HandoverScheduleService } from 'src/app/_shared/services/handover-schedule.service';

@Component({
  selector: 'app-collate-costs-data',
  templateUrl: './collate-costs-data.component.html',
  styleUrls: ['./collate-costs-data.component.scss'],
  providers: [ScrollService]
})
export class CollateCostsDataComponent extends BaseDataComponent implements OnInit {
  public openTab: number = 1;
  listStatus: any[];
  listProject: any[];
  listPartners: any[];
  listEmployee: any[];
  listContracts: any[];
  listPaymentSchedule: any[];
  listPayment: any[];
  listBidPackage: any[];
  listExpItem: any[];
  listClassification = [
    {
      id: 'Chi thanh toán tạm ứng',
      name: 'Chi thanh toán tạm ứng'
    },
    {
      id: 'Rút dự toán ngân sách',
      name: 'Rút dự toán ngân sách'
    }, {
      id: 'Cam kết chi ngân sách',
      name: 'Cam kết chi ngân sách'
    }, {
      id: 'Điều chỉnh cam kết chi',
      name: 'Điều chỉnh cam kết chi'
    }
  ];
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
  constructor(
    fb: FormBuilder,
    private message: NzMessageService,
    private collateCostsService: CollateCostsService,
    private statusService: StatusService,
    private projectService: ProjectGeneralService,
    private partService: PartnerService,
    private empService: EmployeesService,
    private contractService: ContractsService,
    private paymentType: PaymentTypeService,
    private packageBidsService: PackageBidsService,
    private scrollService: ScrollService,
    private paymentScheduleService: PaymentScheduleService,
    private expItemService: ExpensesItemService,
    public handoverScheduleService:HandoverScheduleService
  ) {
    super(fb);
  }

  async ngOnInit() {
    this.getEmp();
    this.getPartner();
    this.getProject();
    this.getcontractService();
    this.getStatus();
    this.getExpItem();
    this.getPayments();
    this.createForm();
    this.getData();
  }
  createForm() {
    this.myForm = this.fb.group({
      vouchersNumber: [null, [GlobalValidate.required({ error: 'Số chứng từ không được để trống' }),
      GlobalValidate.space({ error: 'Số chứng từ không được để trống' })]], // số chứng từ
      data: this.fb.group({
        datePosted: [null, [GlobalValidate.required({ error: 'Ngày vào sổ không được để trống' })]], // ngày vào sổ
        vouchersDate: [null, [GlobalValidate.required({ error: 'Ngày chứng từ không được để trống' })]], // ngày chứng từ
        statusId: [null], // trạng thái
        currency: ['VND'], // loại tiền
        exchangeRate: [1], // tỷ giá
        classification: [null], // phan loai
        content: [null, [GlobalValidate.required({ error: 'Tên chi phí không được để trống' }),
        GlobalValidate.MaxLength(255, { error: 'Tên chi phí không quá 255 ký tự' }),
        GlobalValidate.space({ error: 'Tên chi phí không được để trống' })]], // tên chi phí
        accountant: [null], // viên kế toán
        accountant2: [null], // kế toán 2
        contractId: [null], // id hợp đồng
        projectId: [null, [GlobalValidate.required({ error: 'Dự án không được để trống' })]], // id dự án
        frameContract: [null], // hợp đồng frame
        bidId: [null],  // id gói thầu
        payments: [null], // Số lần  thanh toán
        paymentType: [null], // loại thức thanh toán
        implementationSchedule: [null], // tiến độ thực hiện
        amountOfMoney: [null], // Số tiền
        expItenId: [null, [GlobalValidate.required({ error: 'Khoản mục chi phí không được để trống' })]], // khoản mục chi phí
        partId: [null], // id đối tác
        coordinationList: [null], // người liên quan
        empId: [null], // người phụ trách,
        index: [null], // thu tu
        note: [null, [GlobalValidate.MaxLength(2000, { error: 'Ghi chú không được quá 2000 ký tự' })]],
      }),
      dataDb: this.fb.group({
        status: [1]
      }),
      partner: this.fb.group({
        contact: [null],
        address: [null],
        mobile: [null],
        email: [null],
        fax: [null],
      }),
      statusContract: [null]
    });
    if (this.isView) { this.myForm.disable() }
  }
  async getStatus() {
    this.listStatus = [];

    const param = { where: { and: [{ 'data.statusType': 1035 }, { 'dataDb.status': 1 }] } };
    const status = await this.statusService.get(param);

    if (status.ok) {
      status.result.data.forEach(item => {
        this.listStatus.push({
          id: item.id,
          name: item.data.statusName
        });
      });
    }
  }


  //lấy hình thức thanh toán
  async getPayments() {
    this.listPayment = [];
    let res = await this.paymentType.get({});
    if (res.ok) {
      this.listPayment = res.result.data.map(x => {
        return {
          id: x.id,
          name: x.data.paymentTypeName
        }
      })
    }
  }


  async getData() {
    if (this.id) {
      const rs = await this.collateCostsService.findOne({where:{'vouchersNumber': this.id}});
      if (rs.ok) {
        this.myForm.patchValue(rs.result);
        await this.updateProject();
        await this.updateContract();
        this.updatePartner();
        this.myForm.get('data.payments').setValue(rs.result.data.payments);
        this.myForm.get('data.amountOfMoney').setValue(rs.result.data.amountOfMoney);
      }
    }
  }


  //lấy hợp đồng
  async getcontractService() {
    this.listContracts = [];
    let rs = await this.contractService.get({ size: 200 });
    if (rs.ok) {
      this.listContracts = rs.result.data.map(x => {
        return {
          id: x.id,
          name: x.contractCode
        }
      })
    }
  }

  async getProject() {
    this.listProject = [];
    let rs = await this.projectService.get({ size: 200 });
    if (rs.ok) {

      this.listProject = rs.result.data.map(x => {
        return {
          id: x.id,
          name: x.projName,
        };
      });
    }
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {

  }

  // lấy nhân viên phòng ban
  async getEmp() {
    this.listEmployee = [];
    let kt = await this.empService.get({});
    if (kt.ok) {
      this.listEmployee = kt.result.data.map(x => {
        return {
          id: x.id,
          name: x.basic.fullName
        }
      });
    }
  }

  // lấy đối tác
  async getPartner() {
    this.listPartners = [];
    let res = await this.partService.get({});
    if (res.ok) {
      res.result.data.forEach(x => {
        this.listPartners.push({
          id: x.id,
          name: x.data.partnerNameVn,
          data: x.data
        });
      });
    }
  }


  async getExpItem() {
    this.listExpItem = [];
    let rs = await this.expItemService.get({ size: 200, where: { "dataDb.status": 1 } });
    if (rs.ok) {
      this.listExpItem = rs.result.data.map(x => {
        x.name = x.data.expensesItemName;
        return x;
      });
    }
  }

  updatePartner() {
    let form = this.myForm.value;
    if (form.data.partId) {
      let part = this.listPartners.find(x => x.id === form.data.partId);
      this.myForm.patchValue({
        partner: {
          contact: part.data.contact,
          address: part.data.address,
          mobile: part.data.mobile,
          email: part.data.email,
          fax: part.data.fax,
        }
      });
    } else {
      this.myForm.get('partner').reset();
    }
  }

  async updateProject() {
    let form = this.myForm.value;
    if (form.data.projectId) {
      const rs = await this.contractService.get({ where: { 'projId': form.data.projectId } })
      if (rs.ok) {
        this.listContracts = rs.result.data.map(x => {
          x.name = x.contractName;
          return x;
        });
      }
    } else {
      this.listContracts = [];
    }
  }

  resertContract() {
    this.myForm.patchValue({
      data: {
        contractId: null,
        bidId: null,
        payments: null
      },
      statusContract: null
    });
  }

  async updateContract() {
    let form = this.myForm.value;
    if (form.data.contractId) {
      let contract = this.listContracts.find(x => x.id === form.data.contractId)
      let bid = await this.packageBidsService.findOneById(+contract.packageBidsId);
      if (bid.result) {
        this.listBidPackage = [{ id: bid.result.id, name: bid.result.packageBidName }];
      }
      const handover= await this.handoverScheduleService.get({where:{contractsId:form.data.contractId}});
      let sttHandover=(handover.ok && handover.result.data.length>0)?handover.result.data[0].productName:null;
      let payments = await this.paymentScheduleService.get({ where: { 'contractId': form.data.contractId } });
      if (payments.ok) {
        this.listPaymentSchedule = payments.result.data.map(x => {
          return {
            id: x.id,
            name: x.explain,
            amountOfMoney: x.amountOfMoney
          }
        });
      }
      this.myForm.patchValue({
        data: {
          bidId: this.listBidPackage ? this.listBidPackage[0].id : null,
          payments:null
        },
        statusContract: sttHandover
      });
      this.updateAmountOfMoney();
    }
    else {
      this.resertContract();
    }
  }

  updateAmountOfMoney() {
    let form = this.myForm.value;
    if (form.data.payments) {
      let rs = this.listPaymentSchedule.find(x => x.id === +form.data.payments);
      this.myForm.get('data.amountOfMoney').setValue(rs.amountOfMoney);
    }
    else {
      this.myForm.get('data.amountOfMoney').reset();
    }
  }

  addNew() {
    this.createForm();
    this.id = null;
  }

  async submit(close: boolean = true) {
    super.submitForm();
    this.myForm.patchValue({
      vouchersNumber: this.myForm.get('vouchersNumber').value ? this.myForm.get('vouchersNumber').value.trim() : null,
      data: {
        note: this.myForm.get('data.note').value ? this.myForm.get('data.note').value.trim() : null,
        content: this.myForm.get('data.content').value ? this.myForm.get('data.content').value.trim() : null,
      }
    })
    const tabFocus = this.validateTab(this.myForm);
    if (tabFocus) { this.openTab = tabFocus; }
    if (this.myForm.invalid) { this.scrollService.scrollToTop(); return };
    let form = this.myForm.value;
    form.dataDb.status = isBoolean(form.dataDb.status) ? (form.dataDb.status === true ? 1 : 0) : form.dataDb.status;
    delete form.partner;
    delete form.statusContract;
    if (!this.id) {
      const checkID = await this.collateCostsService.findOneById(form.vouchersNumber);
      if (checkID.result) {
        document.getElementById('collapseOne').className = "collapse show";
        this.myForm.get('vouchersNumber').setErrors({ error: 'Số chứng từ đã tồn tại' });
        document.getElementById('vouchersNumber').focus();
        return;
      }
    }
    let rs = this.id ? await this.collateCostsService.edit(this.id, form) : await this.collateCostsService.add(form);
    if (rs.ok) {
      console.log(rs.result);
      this.message.success('Lưu thành công');
      close ? this.handleOk(rs.result) : this.addNew();
    }
    else {
      this.message.error('Lỗi! Lưu thất bại ');
      return;
    }
  }
}
