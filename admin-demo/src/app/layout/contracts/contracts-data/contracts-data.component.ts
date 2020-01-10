import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalValidate } from 'src/app/_base/class/global-validate';
import { BaseDataComponent } from 'src/app/_base/components/base-data-component';
import { ProjectGeneralService } from 'src/app/_shared/services/project-general.service';
import { NzMessageService } from 'ng-zorro-antd';
import { PackageBidsService } from 'src/app/_shared/services/package-bids.service';
import { ContractsService } from 'src/app/_shared/services/contracts.service';
import { ContractFormService } from 'src/app/_shared/services/contract-form.service';
import { StatusService } from 'src/app/_shared/services/status.service';
import { TermsOfPaymentService } from 'src/app/_shared/services/terms-of-payment.service';
import { PaymentTypeService } from 'src/app/_shared/services/payment-type.service';



@Component({
  selector: 'app-contracts-data',
  templateUrl: './contracts-data.component.html',
  styleUrls: ['./contracts-data.component.scss']
})
export class ContractsDataComponent extends BaseDataComponent implements OnInit {
  public data: any = null;
  public myForm: FormGroup;
  public load = true;
  public listProject: any[];
  public listPackageBids: any[];
  public isView = false;
  public listContractClassification = [{
    id: 0,
    name: 'Hợp đồng mua'
  }, {
    id: 1,
    name: 'Hợp đồng bán'
  }];
  public listcontractForm: any[];
  public listStatus: any[];
  // public listCurrency: any[];
  public listTermsOfPayment: any[];
  public listPaymentType: any[];
  public openTab = 1;
  @Input() projGeneralId: number;
  @Input() packageBidsId: number;
  @Input() item: any;

  constructor(
    fb: FormBuilder,
    public projGeneralService: ProjectGeneralService,
    public packageBidsService: PackageBidsService,
    public contractFormService: ContractFormService,
    public statusService: StatusService,
    // public currencyService: CurrencyService,
    public termsOfPaymentService: TermsOfPaymentService,
    public paymentTypeService: PaymentTypeService,
    public contractsService: ContractsService,
    private message: NzMessageService,
  ) { super(fb); }

  async ngOnInit() {
    this.creatForm();
    await this.getStatus();
    this.myForm.get('statusId').setValue(this.listStatus ? this.listStatus[0].id : null);
    const listTask = [];
    listTask.push(this.getcontractFormService());
    listTask.push(this.getProject());
    // listTask.push(this.getCurrency());
    listTask.push(this.getTermsOfPayment());
    listTask.push(this.getPaymentType());
    await Promise.all(listTask);
    if (this.item) {
      this.myForm.patchValue(this.item);
      this.getPackageBids(this.item.projId);
    }
  }

  creatForm() {
    this.myForm = this.fb.group({
      projId: [null, GlobalValidate.required({ error: 'Không được để trống' })], // Tên dự án
      packageBidsId: [null, GlobalValidate.required({ error: 'Không được để trống' })], // Tên gói thầu
      contractName: [null, GlobalValidate.required({ error: 'Không được để trống' })], // Tên hợp đồng
      contractCode: [null, GlobalValidate.required({ error: 'Không được để trống' })], // Số hợp đồng
      decisionNumber: [null], // Số quyết định
      dateOfSignedDecision: [null], // Ngày quyết định
      signedOn: [null], // Ngày ký
      persionInChange: [null], // Người phụ trách
      contractClassification: [null], // Phân loại
      contractFormId: [null], // Hình thức
      statusId: [null], // Trạng thái
      currency: ['VND'], // Loại tiền
      exchangeRate: [1], // Tỉ giá
      // tslint:disable-next-line: max-line-length
      contractValue: [null, GlobalValidate.required({ error: 'Không được để trống' })], // Giá trị hợp đồng
      deductibleValue: [null], // Giá trị giảm trừ
      termsOfPaymentId: [null], // Điều khoản
      paymentTypeId: [null], // Hình thức thanh toán
      durationOfContract: [null], // Thời gian thực hiện HĐ
      effectiveDate: [null], // Ngày hiệu lực
      expiryDate: [null], // Ngày hết hạn
      dateOfAdvanceGuarantee: [null], // Ngày bảo lãnh TƯ
      endDateOfAdvGuar: [null], // Ngày kết thúc BLTƯ
      percentAdvanceGuarantee: [null], // Bảo lãnh tạm ứng %
      amountOfAdvGuar: [null], // Tiền BLTƯ
      dateOfMakeAdvGuar: [null], // Ngày bảo lãnh THHĐ
      endDateOfMakeAdvGuar: [null], // Ngày kết thúc BLTƯ
      percentOfMakeAdvGuar: [null], // Bảo lãnh THHĐ %
      amountOfMakeAdvGuar: [null], // Tiền bảo lãnh THHĐ
      warrantyEndDate: [null], // Ngày kết thúc BH
      liquidationDay: [null], // Ngày thanh lý
      percentGuarOfWarranty: [null], // Bảo lãnh bảo hành %
      amountGuarOfWarranty: [null], // Tiền bảo lãnh BH
      note: [null], // Ghi chú
      index: [null], // Thứ tự
    });
    if (this.isView) { this.myForm.disable(); }
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
  }

  async getPackageBids(event) {
    this.listPackageBids = [];
    // tslint:disable-next-line: max-line-length
    const rs = await this.packageBidsService.get({ where: { projId: event }, size: this.defauteSize });
    if (rs.ok) {
      rs.result.data.forEach(item => {
        this.listPackageBids.push({
          id: item.id,
          name: item.packageBidName
        });
      });
      if (!this.item) {
        // tslint:disable-next-line: max-line-length
        this.listPackageBids.length > 0 ? this.myForm.controls.packageBidsId.patchValue(this.listPackageBids[0].id) : this.myForm.controls.packageBidsId.patchValue(null);
      }
    }
  }

  async getcontractFormService() {
    this.listcontractForm = [];
    const rs = await this.contractFormService.get({ size: this.defauteSize });
    if (rs.ok) {
      rs.result.data.forEach(item => {
        this.listcontractForm.push({
          id: item.id,
          name: item.data.contractFormName
        });
      });
    }
  }

  async getStatus() {
    this.listStatus = [];
    const rs = await this.statusService.get({ where: { 'data.statusType': 1029 }, order: '[{\"id\": true}]', size: this.defauteSize });
    if (rs.ok) {
      rs.result.data.forEach(item => {
        this.listStatus.push({
          id: item.id,
          name: item.data.statusName
        });
      });
    }
  }

  // async getCurrency() {
  //   this.listCurrency = [];
  //   const rs = await this.currencyService.get({ size: this.defauteSize });
  //   if (rs.ok) {
  //     rs.result.data.forEach(item => {
  //       this.listCurrency.push({
  //         id: item.iso,
  //         name: item.iso
  //       });
  //     });
  //   }
  // }

  async getTermsOfPayment() {
    this.listTermsOfPayment = [];
    const rs = await this.termsOfPaymentService.get({ size: this.defauteSize });
    if (rs.ok) {
      rs.result.data.forEach(item => {
        this.listTermsOfPayment.push({
          id: item.id,
          name: item.data.termsOfPaymentName
        });
      });
    }
  }

  async getPaymentType() {
    this.listPaymentType = [];
    const rs = await this.paymentTypeService.get({ size: this.defauteSize });
    if (rs.ok) {
      rs.result.data.forEach(item => {
        this.listPaymentType.push({
          id: item.id,
          name: item.data.paymentTypeName
        });
      });
    }
  }

  async submit(close: boolean) {
    super.submitForm();
    if (this.myForm.invalid) { return; }
    const rs = ((!this.id) ? await this.contractsService.add(this.myForm.value)
      : await this.contractsService.edit(this.id as number, this.myForm.value));
    console.log(rs.result.projId);
    if (rs.ok) {
      this.message.success('Lưu thành công');
      if (close) {
        this.handleOk(rs.result);
      }
      this.item = rs.result;
      this.id = rs.result.id;
      this.projGeneralId = rs.result.projId;
      this.packageBidsId = rs.result.packageBidsId;
    } else {
      this.message.error('Lỗi! Lưu thất bại');
    }
  }

  hasValue() {
    if (this.myForm.controls.percentGuarOfWarranty.value > 0) {
      this.myForm.controls.amountGuarOfWarranty.setValue(this.myForm.controls.contractValue.value
        * this.myForm.controls.percentGuarOfWarranty.value / 100);
    }
    if (this.myForm.controls.percentAdvanceGuarantee.value > 0) {
      this.myForm.controls.amountOfAdvGuar.setValue(this.myForm.controls.contractValue.value
        * this.myForm.controls.percentAdvanceGuarantee.value / 100);
    }
    if (this.myForm.controls.percentOfMakeAdvGuar.value > 0) {
      this.myForm.controls.amountOfMakeAdvGuar.setValue(this.myForm.controls.contractValue.value
        * this.myForm.controls.percentOfMakeAdvGuar.value / 100);
    }
  }

}


// percentAdvanceGuarantee: [null], // Bảo lãnh tạm ứng %
//   amountOfAdvGuar: [null], // Tiền BLTƯ

