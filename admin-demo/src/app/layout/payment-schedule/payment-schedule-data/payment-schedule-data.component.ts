import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseDataComponent } from 'src/app/_base/components/base-data-component';
import { ProjectGeneralService } from 'src/app/_shared/services/project-general.service';
import { EmployeesService } from 'src/app/_shared/services/employees.service';
import { NzMessageService, NzInputDirective } from 'ng-zorro-antd';
import { PackageBidsService } from 'src/app/_shared/services/package-bids.service';
import { PaymentScheduleService } from 'src/app/_shared/services/payment-schedule.service';

@Component({
  selector: 'app-payment-schedule-data',
  templateUrl: './payment-schedule-data.component.html',
  styleUrls: ['./payment-schedule-data.component.scss']
})
export class PaymentScheduleDataComponent extends BaseDataComponent implements OnInit {
  @Input() projectId: number;
  @Input() contractId: number;
  @Input() handoverId: number;
  @Input() item: any;


  public data: any = null;
  public myForm: FormGroup;
  public listPriority: any[] = [];
  public load = true;
  public listProject: any[];
  public listPackageBids: any[];
  public listEmployee: any[];
  constructor(
    fb: FormBuilder,
    public projGeneralService: ProjectGeneralService,
    public paymentScheduleService: PaymentScheduleService,
    public packageBidsService: PackageBidsService,
    private employeeService: EmployeesService,
    private message: NzMessageService,
  ) { super(fb); }

  async ngOnInit() {
    this.creatForm();
    await this.getProject();
    await this.getPackageBids();
    await this.getEmployee();
    if (this.item) {
      this.myForm.patchValue(this.item);
    }
    console.log('handove', this.handoverId);

  }

  creatForm() {
    this.myForm = this.fb.group({
      contractId: [this.contractId], // Hợp đồng
      handoverId: [this.handoverId], // Tiến độ
      projId: [this.projectId], // Dự án
      countOfPayment: [null], // lần thanh toán
      numberOfDay: [null], // Số ngày
      appointmentDate: [null], // Ngày hẹn
      amountOfMoney: [null], // Số tiền
      numberOfPenaltyDays: [null], // Phạt (ngày)
      penaltyDate: [null], // Ngày phạt
      penaltyRate: [null], // % phạt
      numberOfBonusDays: [null], // Thưởng (ngày)
      rewardDate: [null], // ngày thưởng
      bonusRatio: [null], // % thưởng
      explain: [null], // Diễn giải
      productCode: [null], // mã sản phẩm
      note: [null], // Ghi chú
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

  async getPackageBids() {
    this.listPackageBids = [];
    const rs = await this.packageBidsService.get({ size: this.defauteSize });
    if (rs.ok) {
      rs.result.data.forEach(item => {
        this.listPackageBids.push({
          id: item.id,
          name: item.packageBidName
        });
      });
    }
  }
  async getEmployee() {
    this.listEmployee = [];
    const rs = await this.employeeService.get({ size: this.defauteSize });
    if (rs.ok) {
      rs.result.data.forEach(x => {
        this.listEmployee.push({
          id: x.id,
          name: x.basic.fullName
        });
      });
    }
  }

  async submit(close: boolean) {
    super.submitForm();
    if (this.myForm.invalid) { return; }
    const rs = ((!this.item) ? await this.paymentScheduleService.add(this.myForm.value)
      : await this.paymentScheduleService.edit(this.item.id as number, this.myForm.value));
    console.log(rs);
    if (rs.ok) {
      this.message.success('Lưu thành công');
      if (close) {
        this.handleOk(rs.result);
      }
      this.item = null;
      this.creatForm();
    } else {
      this.message.error('Lỗi! Lưu thất bại');
    }
  }
}
