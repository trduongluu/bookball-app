import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalValidate } from 'src/app/_base/class/global-validate';
import { BaseDataComponent } from 'src/app/_base/components/base-data-component';
import { ProjectGeneralService } from 'src/app/_shared/services/project-general.service';
import { EmployeesService } from 'src/app/_shared/services/employees.service';
import { NzMessageService } from 'ng-zorro-antd';
import { HandoverScheduleService } from 'src/app/_shared/services/handover-schedule.service';
import { StatusService } from 'src/app/_shared/services/status.service';
import { ContractsService } from 'src/app/_shared/services/contracts.service';
import { PackageBidsService } from 'src/app/_shared/services/package-bids.service';
import { PaymentTypeService } from 'src/app/_shared/services/payment-type.service';
import { TermsOfPaymentService } from 'src/app/_shared/services/terms-of-payment.service';


@Component({
  selector: 'app-handover-schedule-data',
  templateUrl: './handover-schedule-data.component.html',
  styleUrls: ['./handover-schedule-data.component.scss']
})
export class HandoverScheduleDataComponent extends BaseDataComponent implements OnInit {
  public data: any = null;
  public myForm: FormGroup;
  public load = true;
  public handoverClass = [
    { id: 'tamtinh', name: 'Tạm tính' },
    { id: 'hoadon', name: 'Hóa đơn' },
  ];
  public listStatus: any[];
  public listProject: any[];
  public listContracts: any[];
  public listPackageBids: any[];
  public listpaymentType: any[];
  public listermsOfPayment: any[];
  public openTab = 1;
  @Input() item: any;
  @Input() handoverId: number;
  @Input() projectId: number;
  @Input() contratId: number;

  constructor(
    fb: FormBuilder,
    public statusService: StatusService,
    public projGeneralService: ProjectGeneralService,
    public contractsService: ContractsService,
    public packageBidsService: PackageBidsService,
    public paymentTypeService: PaymentTypeService,
    public termsOfPaymentService: TermsOfPaymentService,
    public handoverScheduleService: HandoverScheduleService,
    private message: NzMessageService,
  ) {
    super(fb);
  }

  async ngOnInit() {
    this.creatForm();
    await this.getlistStatus();
    this.myForm.get('statusId').setValue(this.listStatus ? this.listStatus[0].id : null);
    this.getProject();
    this.getlistpaymentType();
    this.getlistermsOfPayment();
    await this.getData();
    if (this.item) {
      this.myForm.patchValue(this.item);
      this.getlistPackageBids(this.item.projId);
      this.getlistContracts(this.item.packageBidId);
    }
  }

  creatForm() {
    this.myForm = this.fb.group({
      startDate: [null, GlobalValidate.required({ error: 'Không được để trống' })], // Ngày bắt đầu
      endDate: [null, GlobalValidate.required({ error: 'Không được để trống' })], // Ngày kết thúc
      handoverClassification: ['tamtinh'], // Phân loại
      statusId: [null], // Trạng thái
      productName: [null, GlobalValidate.required({ error: 'Không được để trống' })], // Sản phẩm
      content: [null], // Nội dung
      projId: [null, GlobalValidate.required({ error: 'Không được để trống' })], // Tên dự án
      contractsId: [null, GlobalValidate.required({ error: 'Không được để trống' })], // Số hợp đồng
      contractCodeBase: [null], // Số khung hợp đồng
      packageBidId: [null, GlobalValidate.required({ error: 'Không được để trống' })], // Gói thầu
      mass: [null], // Khối lượng
      percentMass: [null], // Phần trăm
      estimatedValue: [null], // Ước thanh toán
      estimatedDate: [null, GlobalValidate.required({ error: 'Không được để trống' })], // Ngày ước TT
      payId: [null], // Hình thức TT
      termPayId: [null], // Điều khoản TT
      billNumber: [null], // Số hóa đơn
      billDate: [null], // Ngày hóa đơn
      note: [null], // Ghi chú
      index: [null], // Thứ tự
      allowDisplay: [1], // Hiển thị
    });
    if (this.isView) { this.myForm.disable(); }
  }

  async getlistStatus() {
    const rs = await this.statusService.get(
      { where: { 'data.statusType': 1040 }, order: '[{\"id\": true}]', size: this.defauteSize });
    if (rs.ok) {
      this.listStatus = rs.result.data.map(x => {
        return {
          id: x.id,
          name: x.data.statusName
        };
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
  }
  async getlistPackageBids(event) {
    this.listPackageBids = [];
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
        this.listPackageBids.length > 0 ? this.myForm.controls.packageBidId.patchValue(this.listPackageBids[0].id) : this.myForm.controls.packageBidId.patchValue(null);
      }
      this.getlistContracts(this.myForm.controls.packageBidId.value);
    }
  }

  async getlistContracts(event) {
    this.listContracts = [];
    const rs = await this.contractsService.get({ where: { packageBidsId: event }, size: this.defauteSize });
    if (rs.ok) {
      rs.result.data.forEach(item => {
        this.listContracts.push({
          id: item.id,
          name: item.contractName
        });
      });
      if (!this.item) {
        // tslint:disable-next-line: max-line-length
        this.listContracts.length > 0 ? this.myForm.controls.contractsId.patchValue(this.listContracts[0].id) : this.myForm.controls.contractsId.patchValue(null);
      }
    }
  }


  async getlistpaymentType() {
    this.listpaymentType = [];
    const rs = await this.paymentTypeService.get({ size: this.defauteSize });
    if (rs.ok) {
      rs.result.data.forEach(item => {
        this.listpaymentType.push({
          id: item.id,
          name: item.data.paymentTypeName
        });
      });
    }
  }
  async getlistermsOfPayment() {
    this.listermsOfPayment = [];
    const rs = await this.termsOfPaymentService.get({ size: this.defauteSize });
    if (rs.ok) {
      rs.result.data.forEach(item => {
        this.listermsOfPayment.push({
          id: item.id,
          name: item.data.termsOfPaymentName
        });
      });
    }
  }

  async getData() {
    if (this.id) {
      const rs = await this.handoverScheduleService.findOneById(this.id);
      if (rs.ok) {
        this.myForm.patchValue(rs.result);
      }
    }
  }

  async submit(close: boolean) {
    super.submitForm();
    if (this.myForm.invalid) { return; }
    const rs = ((this.item == null) ? await this.handoverScheduleService.add(this.myForm.value)
      : await this.handoverScheduleService.edit(this.item.id, this.myForm.value));
    if (rs.ok) {
      this.message.success('Lưu thành công');
      if (close) {
        this.handleOk(rs.result);
      }
      this.item = rs.result;
      this.id = rs.result.id;
      this.handoverId = rs.result.id;
      this.contratId = rs.result.contractsId;
      this.projectId = rs.result.projId;

    } else {
      this.message.error('Lỗi! Lưu thất bại');
    }
  }
}
