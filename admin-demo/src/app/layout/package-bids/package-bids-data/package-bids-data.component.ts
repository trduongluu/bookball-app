import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalValidate } from 'src/app/_base/class/global-validate';
import { BaseDataComponent } from 'src/app/_base/components/base-data-component';
import { ProjectGeneralService } from 'src/app/_shared/services/project-general.service';
import { PackageBidsService } from 'src/app/_shared/services/package-bids.service';
import { EmployeesService } from 'src/app/_shared/services/employees.service';
import { PartnerService } from 'src/app/_shared/services/partner.service';
import { NzMessageService } from 'ng-zorro-antd';
import { StatusService } from 'src/app/_shared/services/status.service';
import { BiddingModelService } from 'src/app/_shared/services/bidding-model.service';
import { BiddingService } from 'src/app/_shared/services/bidding.service';
import { ContractorService } from 'src/app/_shared/services/contractor.service';
import { Utilities } from 'src/app/_shared/extensions/utilities';

@Component({
  selector: 'app-package-bids-data',
  templateUrl: './package-bids-data.component.html',
  styleUrls: ['./package-bids-data.component.scss']
})
export class PackageBidsDataComponent extends BaseDataComponent implements OnInit {
  public data: any = null;
  public myForm: FormGroup;
  public listPriority: any[] = [];
  public load = true;
  public listStatus: any[];
  public listProject: any[];
  public listBiddingModel: any[];
  public listBidding: any[];
  public listEmployee: any[] = [];
  public listContractor: any[];
  public listPartners: any[];
  public openTab = 1;
  @Input() item: any;
  @Input() projGeneralId: number;

  constructor(
    fb: FormBuilder,
    public statusService: StatusService,
    public projGeneralService: ProjectGeneralService,
    public biddingModelService: BiddingModelService,
    public biddingService: BiddingService,
    // public currencyService: CurrencyService,
    private employeeService: EmployeesService,
    private contractorService: ContractorService,
    private partnerService: PartnerService,
    public packageBidsService: PackageBidsService,
    private message: NzMessageService,
  ) { super(fb); }

  async ngOnInit() {
    await this.getStatus();
    this.creatForm();
    this.getEmployee();
    this.getProject();
    // this.getCurrency();
    this.getBiddingModel();
    this.getBidding();
    this.getContractor();
    this.getPartners();
    await this.getData();
  }

  creatForm() {
    this.myForm = this.fb.group({
      id: null,
      projId: [null, GlobalValidate.required({ error: 'Không được để trống' })], // Tên dự án
      packageBidName: [null, GlobalValidate.required({ error: 'Không được để trống' })], // Tên gói thầu
      startDay: [Utilities.DateNowUTC(), GlobalValidate.required({ error: 'Không được để trống' })], // Ngày bắt đầu
      lastDay: [null, GlobalValidate.required({ error: 'Không được để trống' })], // Ngày kết thúc
      statusId: [this.listStatus ? this.listStatus[0].id : null], // Trạng thái
      currency: ['VND'], // Loại tiền
      exchangeRate: [1], // Loại tiền
      estimatedPrice: [null], // Giá dự toán
      bidPrice: [null], // Giá gói thầu
      bestBid: [null], // Giá trúng thầu
      contractPrice: [null], // Giá hợp đồng
      bidModelId: [null], // LV đấu thầu
      bidId: [null], // PT đấu thầu
      empId: [null], // Người phụ trách
      contractorId: [null], // HT lựa chọn
      listEmpId: [[]], // Người phối hợp
      partId: [null], // Đối tác
      note: [null], // Ghi chú
      contact: [{ value: null, disabled: true }],
      email: [{ value: null, disabled: true }],
      phone: [{ value: null, disabled: true }],
      fax: [{ value: null, disabled: true }],
      index: [1, GlobalValidate.MinLengthNumber(1, { error: 'Giá trị phải lớn hơn 1' })],
      allowDisplay: [true],
    });
    if (this.isView) { this.myForm.disable(); }
  }

  async getStatus() {
    this.listStatus = [];
    const rs = await this.statusService.get({ where: { 'data.statusType': 26 }, order: '[{\"id\": true}]', size: this.defauteSize });
    if (rs.ok) {
      rs.result.data.forEach(x => {
        this.listStatus.push({
          id: x.id,
          name: x.data.statusName
        });
      });
    }
  }

  async getProject() {
    this.listProject = [];
    const rs = await this.projGeneralService.get({ size: this.defauteSize });
    if (rs.ok) {
      rs.result.data.forEach(item => {
        this.listProject.push({
          id: item.id,
          name: item.projName
        });
      });
    }
    console.log('mais ko ra', this.listProject);
  }

  // async getCurrency() {
  //   this.listCurrency = [];
  //   const rs = await this.currencyService.get({});
  //   if (rs.ok) {
  //     rs.result.data.forEach(item => {
  //       this.listCurrency.push({
  //         id: item.iso,
  //         name: item.iso
  //       });
  //     });
  //   }
  // }

  async getBiddingModel() {
    this.listBiddingModel = [];
    const rs = await this.biddingModelService.get({ size: this.defauteSize });
    if (rs.ok) {
      rs.result.data.forEach(item => {
        this.listBiddingModel.push({
          id: item.id,
          name: item.data.binddingModelName
        });
      });
    }
  }

  async getBidding() {
    this.listBidding = [];
    const rs = await this.biddingService.get({ size: this.defauteSize });
    if (rs.ok) {
      rs.result.data.forEach(item => {
        this.listBidding.push({
          id: item.id,
          name: item.data.biddingName
        });
      });
    }
  }

  async getEmployee() {
    this.listEmployee = [];
    const rs = await this.employeeService.get({ size: this.defauteSize });
    if (rs.ok) {
      this.listEmployee = rs.result.data.map(x => {
        return {
          id: x.id,
          name: x.basic.fullName
        };
      });
    }
  }

  async getContractor() {
    this.listContractor = [];
    const rs = await this.contractorService.get({ size: this.defauteSize });
    if (rs.ok) {
      rs.result.data.forEach(item => {
        this.listContractor.push({
          id: item.id,
          name: item.data.contractorName
        });
      });
    }
  }

  async getPartners() {
    this.listPartners = [];
    const rs = await this.partnerService.get({ size: this.defauteSize });
    if (rs.ok) {
      rs.result.data.forEach(item => {
        this.listPartners.push({
          id: item.id,
          name: item.data.partnerNameVn
        });
      });
    }
  }

  async updateValue() {
    const value = this.myForm.get('partId').value;
    if (value) {
      const rs = await this.partnerService.get({ where: { id: value } });
      if (rs.ok) {
        this.myForm.patchValue({
          contact: rs.result.data[0].data.contact,
          email: rs.result.data[0].data.email,
          phone: rs.result.data[0].data.mobile,
          fax: rs.result.data[0].data.fax,
        });
      }
    } else {
      this.myForm.patchValue({
        contact: null,
        email: null,
        phone: null,
        fax: null,
      });
    }
  }

  async getData() {
    if (this.item) {
      this.myForm.patchValue(this.item);
      this.updateValue();
    }
  }

  async submit(close: boolean) {
    super.submitForm();
    if (this.myForm.invalid) { return; }
    const rs = ((!this.item) ? await this.packageBidsService.add(this.myForm.value)
      : await this.packageBidsService.edit(this.item.id, this.myForm.value));
    if (rs.ok) {
      this.message.success('Lưu thành công');
      if (close) {
        this.handleOk(rs.result);
      }
      this.item = rs.result;
      this.id = rs.result.id;
      this.projGeneralId = rs.result.projId;
    } else {
      this.message.error('Lỗi! Lưu thất bại');
    }
  }
}
