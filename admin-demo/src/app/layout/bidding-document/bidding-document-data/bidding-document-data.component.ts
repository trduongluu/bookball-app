import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalValidate } from 'src/app/_base/class/global-validate';
import { BaseDataComponent } from 'src/app/_base/components/base-data-component';
import { ProjectGeneralService } from 'src/app/_shared/services/project-general.service';
import { EmployeesService } from 'src/app/_shared/services/employees.service';
import { NzMessageService } from 'ng-zorro-antd';
import { PackageBidsService } from 'src/app/_shared/services/package-bids.service';
import { BiddingDocumentService } from 'src/app/_shared/services/bidding-document.service';
import { async } from 'q';


@Component({
  selector: 'app-bidding-document-data',
  templateUrl: './bidding-document-data.component.html',
  styleUrls: ['./bidding-document-data.component.scss']
})
export class BiddingDocumentDataComponent extends BaseDataComponent implements OnInit {
  @Input() projGeneralId: number;
  @Input() packageBidsId: number;
  @Input() item: any;
  public openTab = 1;
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
    public biddingDocumentService: BiddingDocumentService,
    public packageBidsService: PackageBidsService,
    private employeeService: EmployeesService,
    private message: NzMessageService,
  ) { super(fb); }

  async ngOnInit() {
    this.getProject();
    this.getEmployee();
    this.creatForm();
    if (this.item) {
      console.log(this.item);
      this.myForm.patchValue(this.item);
      this.getPackageBids(this.item.projId);
    }
  }

  creatForm() {
    this.myForm = this.fb.group({
      projId: [null, GlobalValidate.required({ error: 'Không được để trống' })],
      packageBidsId: [null, GlobalValidate.required({ error: 'Không được để trống' })], // Gói thầu
      dateOfBidSubmission: [null], // Ngày nộp HSMT
      submissionDate: [null], // Ngày trình
      dateOfVerification: [null], // Ngày thẩm tra
      datePassed: [null], // Ngày thông qua
      dateOfApproval: [null], // Ngày duyệt
      decisionNumber: [null], // Số quyết định
      signedOn: [null], // Ngày kí
      releaseDate: [null], // Ngày phát hành
      listEmpId: [[]], // Người liên quan
      allowDisplay: [{ value: true, disabled: this.isView }], // Hiển thị
      note: [null], // Ghi chú
      index: [null], // thứ tự
    });
    if (this.isView) {
      this.myForm.disable();
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

  async getPackageBids(event) {
    this.listPackageBids = [];
    const rs = await this.packageBidsService.get({ where: { projId: event }, size: this.defauteSize });
    if (rs.ok) {
      rs.result.data.forEach(item => {
        this.listPackageBids.push({
          id: item.id,
          name: item.packageBidName
        });
      });
      // tslint:disable-next-line: max-line-length
      this.listPackageBids.length > 0 ? this.myForm.controls.packageBidsId.patchValue(this.listPackageBids[0].id) : this.myForm.controls.packageBidsId.patchValue(null);
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
    const rs = ((!this.item) ? await this.biddingDocumentService.add(this.myForm.value)
      : await this.biddingDocumentService.edit(this.item.id, this.myForm.value));
    console.log(rs);
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
}
