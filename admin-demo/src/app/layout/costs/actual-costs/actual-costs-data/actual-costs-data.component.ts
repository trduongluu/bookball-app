import { Component, OnInit } from '@angular/core';
import { BaseDataComponent } from 'src/app/_base/components/base-data-component';
import { FormBuilder } from '@angular/forms';
import { GlobalValidate } from 'src/app/_base/class/global-validate';
import { CurrencyService } from 'src/app/_shared/services/currency.service';
import { ProjectGeneralService } from 'src/app/_shared/services/project-general.service';
import { NzMessageService } from 'ng-zorro-antd';
import { ContractsService } from 'src/app/_shared/services/contracts.service';
import { EmployeesService } from 'src/app/_shared/services/employees.service';
import { StatusService } from 'src/app/_shared/services/status.service';
import { ActualCostsService } from 'src/app/_shared/services/actual-costs.service';
import { ExpensesItemService } from 'src/app/_shared/services/expenses-item.service';
import { PartnerService } from 'src/app/_shared/services/partner.service';
import { PaymentTypeService } from 'src/app/_shared/services/payment-type.service';
import { PackageBidsService } from 'src/app/_shared/services/package-bids.service';
import { ScrollService } from 'src/app/_base/services/scroll.service';
import { PaymentScheduleService } from 'src/app/_shared/services/payment-schedule.service';
import { isBoolean } from 'util';
import { HandoverScheduleService } from 'src/app/_shared/services/handover-schedule.service';




@Component({
  selector: 'app-actual-costs-data',
  templateUrl: './actual-costs-data.component.html',
  styleUrls: ['./actual-costs-data.component.scss'],
  providers: [ScrollService]
})
export class ActualCostsDataComponent extends BaseDataComponent implements OnInit {

  public listLog: any[];
  public listExpItem: any[];
  public listProject: any[];
  public listEmployee: any[];
  public listContracts: any[];
  public listStatusActualCosts: any[];
  public listPartners: any[];
  public listPayment: any[];
  public listBidPackage: any[];
  public listPaymentSchedule: any[];
  public listClassification = [
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
  public openTab = 1;
  public item: any;
  constructor(fb: FormBuilder,
    private currencyService: CurrencyService,
    private projectService: ProjectGeneralService,
    private expItemService: ExpensesItemService,
    private actualCostsService: ActualCostsService,
    private message: NzMessageService,
    private employeeService: EmployeesService,
    private statusService: StatusService,
    private partnerService: PartnerService,
    private paymentTypeService: PaymentTypeService,
    private packageBidsService: PackageBidsService,
    private scrollService: ScrollService,
    public paymentScheduleService: PaymentScheduleService,
    public handoverScheduleService: HandoverScheduleService,
    private contractService: ContractsService) {
    super(fb);
  }

  async ngOnInit() {
    this.listLog = [];
    this.createForm();
    const tasks = [this.getExpItem(), this.getStatus(),
    this.getProject(), this.getPayment(), this.getEmployee(),
    this.getPartners()];
    await Promise.all(tasks);
    await this.getData();

  }

  createForm() {
    this.myForm = this.fb.group({
      vouchersNumber: [null, [GlobalValidate.required({ error: 'Số chứng từ không được để trống' }),
      GlobalValidate.space({ error: 'Số chứng từ không được để trống' }),
        //  GlobalValidate.regularNotExpression('<\\s*[a-z][^>]*>(.*?)<\\s*/\\s*[a-z]+>|[!@#$%^&*]', { error: 'Số chứng từ không được chứ ký tự đặc biệt' })
      ]],
      data: this.fb.group({
        datePosted: [null, GlobalValidate.required({ error: 'Ngày vào sổ không đucợ để trống' })], // ngay vao so
        vouchersDate: [null, GlobalValidate.required({ error: 'Ngày chứng từ không được để trống' })], // ngay chung tu,
        status: [null], // trang thái du an
        currency: ['VND'], // loai tien
        exchangeRate: [1], // ty gia
        expItenId: [null, GlobalValidate.required({ error: 'Loại chi phí không được để trống' })], // id loai chi phi
        costName: [null, [GlobalValidate.required({ error: 'Tên chi phí không được để trống' }),
        GlobalValidate.space({ error: 'Tên chi phí không được để trống' }),
        // GlobalValidate.regularNotExpression('<\\s*[a-z][^>]*>(.*?)<\\s*/\\s*[a-z]+>|[!@#$%^&*/]', { error: 'Tên chi phí không được chứ ký tự đặc biệt' }),
        GlobalValidate.MaxLength(250, { error: 'Tên chi phí không được vượt quá 250 ký tự' })]], // ten chi phi
        accountant: [null], // ke toan empId
        projectId: [null, GlobalValidate.required({ error: 'Dự án không được để trống' })], // du an
        contractId: [null], // hop dong
        frameContract: [null, [GlobalValidate.MaxLength(50, { error: 'Số khung HĐ không được vượt quá 50 ký tự' })]], // so khung Hop dong
        bidId: [null], // goi thau
        payments: [null], // thanh toan
        implementationSchedule: [null], // tien do thuc hien
        amountOfMoney: [null, GlobalValidate.required({ error: 'Số tiền không được để trống' })], // so tien
        taxpay: [null], // nop thue
        amountReceived: [null], // so tien don vi huong
        paymentType: [null], // hinh thuc thanh toan
        partId: [null], // doi tac
        coordinationList: [[]], // nguoi lien quan
        empId: [null], // nuoi phu trach
        index: [null], // thu tu
        classification: [null],
        note: [null, [GlobalValidate.MaxLength(2000, { error: 'Ghi chú không được vượt quá 2000 ký tự' })]]// ghi chu
      }),
      dataDb: this.fb.group({
        status: 1
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
    if (this.isView) { this.myForm.disable(); }
  }

  async getProject() {
    this.listProject = [];
    const rs = await this.projectService.get({ size: 200 });
    if (rs.ok) {
      this.listProject = rs.result.data.map(x => {
        return {
          id: x.id,
          name: x.projName,
          statusName: x.status ? x.status.data.statusName : ''
        };
      });
    }
  }

  async getPayment() {
    this.listPayment = [];
    const rs = await this.paymentTypeService.get({ size: 200, where: { 'dataDb.status': 1 } });
    if (rs.ok) {
      this.listPayment = rs.result.data.map(x => {
        return {
          id: x.id,
          name: x.data.paymentTypeName,
        };
      });
    }
  }

  async getExpItem() {
    this.listExpItem = [];
    const rs = await this.expItemService.get({ size: 200, where: { 'dataDb.status': 1 } });
    if (rs.ok) {
      this.listExpItem = rs.result.data.map(x => {
        x.name = x.data.expensesItemName;
        return x;
      });
    }
  }

  async getEmployee() {
    this.listEmployee = [];
    const rs = await this.employeeService.get({ where: { 'dataDb.status': 1 } });
    if (rs.ok) {
      this.listEmployee = rs.result.data.map(x => {
        return {
          id: x.id,
          name: x.basic.fullName
        };
      });
    }
  }


  async getStatus() {
    this.listStatusActualCosts = [];
    const param = { where: { and: [{ 'data.statusType': 1035 }, { 'dataDb.status': 1 }] } };
    const rs = await this.statusService.get(param);
    if (rs.ok) {
      this.listStatusActualCosts = rs.result.data.map(item => {
        return {
          id: item.id,
          name: item.data.statusName
        };
      });
    }
  }

  async getPartners() {
    this.listPartners = [];
    const rs = await this.partnerService.get({ size: 100, where: { 'dataDb.status': 1 } });
    if (rs.ok) {
      this.listPartners = rs.result.data.map(item => {
        return {
          id: item.id,
          name: item.data.partnerNameVn,
          data: item.data
        };
      });
    }
  }

  async getData() {
    if (this.id) {
      const rs = await this.actualCostsService.findOne({where:{'vouchersNumber': this.id}});
      if (rs.ok) {
        this.myForm.patchValue(rs.result);
        await this.updateProject();
        await this.updateContract();
        this.updatePartner();
        this.myForm.patchValue({
          data: {
            payments:rs.result.data.payments,
            amountOfMoney: rs.result.data.amountOfMoney,
            amountReceived: rs.result.data.amountReceived
          }
        });

      }
    }
  }

  updatePartner() {
    const form = this.myForm.value;
    if (form.data.partId) {
      const part = this.listPartners.find(x => x.id === form.data.partId);
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
    const form = this.myForm.value;
    if (form.data.projectId) {
      const rs = await this.contractService.get({ where: { projId: form.data.projectId } });
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
        payments: null,
        amountOfMoney: null,
        amountReceived: null
      },
      statusContract: null
    });
  }

  async updateContract() {

    const form = this.myForm.value;
    if (form.data.contractId) {
      this.listBidPackage = [];
      const contract = this.listContracts.find(x => x.id === form.data.contractId);
      const bid = await this.packageBidsService.findOneById(+contract.packageBidsId);
      if (bid.result) {
        this.listBidPackage = [{ id: bid.result.id, name: bid.result.packageBidName }];
      }
      const handover = await this.handoverScheduleService.get({ where: { contractsId: form.data.contractId } });
      let sttHandover = (handover.ok && handover.result.data.length > 0) ? handover.result.data[0].productName : null;
      console.log(handover.result.data);

      const payments = await this.paymentScheduleService.get({ where: { contractId: form.data.contractId } });
      if (payments.ok) {
        this.listPaymentSchedule = payments.result.data.map(x => {
          return {
            id: x.id,
            name: x.explain,
            amountOfMoney: x.amountOfMoney
          };
        });
      }
      this.myForm.patchValue({
        data: {
          bidId: this.listBidPackage.length > 0 ? this.listBidPackage[0].id : null,
          payments: null
        },
        statusContract: sttHandover
      });
      this.updateAmountOfMoney();
    } else {
      this.resertContract();
    }
  }

  updateAmountOfMoney() {
    const form = this.myForm.value;
    if (form.data.payments != null) {
      const rs = this.listPaymentSchedule.find(x => x.id === +form.data.payments);
      this.myForm.get('data.amountOfMoney').setValue(rs.amountOfMoney);
    } else {
      this.myForm.get('data.amountOfMoney').reset();
    }
    this.updateAmountReceived();
  }

  updateAmountReceived() {
    const form = this.myForm.value;
    if (form.data.amountOfMoney) {
      if (form.data.taxpay >= form.data.amountOfMoney) {
        this.myForm.get('data.taxpay').setErrors( { error: 'Tiền nộp thuế phải nhỏ hơn Số tiền' });
        return;
      }
      this.myForm.get('data.amountReceived').setValue(form.data.taxpay ? form.data.amountOfMoney - form.data.taxpay : form.data.amountOfMoney);
    } else {
      this.myForm.get('data.amountReceived').reset();
    }
  }

  addNew() {
    this.createForm();
    this.id = null;
  }

  setVaildateCostsName(form: any) {
    this.item = form.data.projectId;
    this.myForm.get('data.costName').setErrors( { error: 'Tên chi phí đã tồn tại' });
    document.getElementById('costName').focus();
    this.scrollService.scrollToTop();
  }

  async submit(close = true) {
    super.submitForm();
    this.myForm.patchValue({
      vouchersNumber: this.myForm.get('vouchersNumber').value ? this.myForm.get('vouchersNumber').value.trim() : null,
      data: {
        note: this.myForm.get('data.note').value ? this.myForm.get('data.note').value.trim() : null,
        // frameContract: this.myForm.get('data.frameContract').value ? this.myForm.get('data.frameContract').value.trim() : null,
        costName: this.myForm.get('data.costName').value ? this.myForm.get('data.costName').value.trim() : null,
      }
    })
    if (this.myForm.invalid) {
      this.scrollService.scrollToTop();
      return
    }
    const form = this.myForm.value;
    form.dataDb.status = isBoolean(form.dataDb.status) ? (form.dataDb.status === true ? 1 : 0) : form.dataDb.status;
    delete form.partner;
    delete form.statusContract;
    if (!this.id) {
      const checkID = await this.actualCostsService.findOneById(form.vouchersNumber);
      if (checkID.result) {
        this.myForm.get('vouchersNumber').setErrors( { error: 'Số chứng từ đã tồn tại' });
        document.getElementById('vouchersNumber').focus();
        return;
      }
    }
    let param = {
      where: {
        and: [
          { 'data.costName': form.data.costName },
          { 'data.projectId': form.data.projectId },
          { 'vouchersNumber': { neq: form.vouchersNumber } }
        ]
      }
    };
    if (!this.id) {
      param.where.and.pop();
    }
    const checkName = await this.actualCostsService.get(param);
    if (checkName.ok && checkName.result.data.length > 0) {

      this.setVaildateCostsName(form);
      return;
    }

    const rs = this.id ? await this.actualCostsService.edit(this.id, form) : await this.actualCostsService.add(form);
    if (rs.ok) {
      this.message.success('Lưu thành công');
      close ? this.handleOk(rs.result) : this.addNew();
    } else {
      this.message.error('Lỗi! Lưu thất bại ');
      return;
    }
  }
}
