import { Component, OnInit } from '@angular/core';
import { BaseDataComponent } from 'src/app/_base/components/base-data-component';
import { FormBuilder } from '@angular/forms';
import { GlobalValidate } from 'src/app/_base/class/global-validate';
import { ExtensionService } from 'src/app/_base/services/extension.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PartnerService } from 'src/app/_shared/services/partner.service';
import { PagingModel } from 'src/app/_base/models/response-model';
import { PartnerGroupService } from 'src/app/_shared/services/partner-group.service';
import { EmployeesService } from 'src/app/_shared/services/employees.service';

@Component({
  selector: 'app-partner-data',
  templateUrl: './partner-data.component.html',
  styleUrls: ['./partner-data.component.scss']
})
export class PartnerDataComponent extends BaseDataComponent implements OnInit {
  public listPartGroup = [];
  public listCountry = [];
  public listGender = [];
  public listEmp = [];
  public listType = [
    { id: 1, name: 'Tổ chức' },
    { id: 2, name: 'Cá nhân' }
  ];
  constructor(
    fb: FormBuilder,
    private ex: ExtensionService,
    private sv: PartnerService,
    private emp: EmployeesService,
    private message: NzMessageService,
    private pgsv: PartnerGroupService
  ) {
    super(fb);
  }

  async ngOnInit() {
    this.createForm({
      data: this.fb.group({
        partCode: [{ value: null, disabled: this.isView }, [GlobalValidate.required({ error: 'Không được để trống' })]],
        partnerNameVn: [{ value: null, disabled: this.isView }, [GlobalValidate.required({ error: 'Không được để trống' })]],
        empId: [{ value: null, disabled: this.isView }],
        idPartGroup: [{ value: null, disabled: this.isView }, [GlobalValidate.required({ error: 'Không được để trống' })]],
        // tslint:disable-next-line: max-line-length
        taxCode: [{ value: null, disabled: this.isView }, [
          GlobalValidate.regularExpression('[0-9]{3}[0-9]{7}-[0-9]{3}', { error: 'Không đúng format' }),
          GlobalValidate.MinLength(10, { error: 'Mã phải tối thiểu 10 kí tự' }),
          GlobalValidate.MaxLength(14, { error: 'Mã tối đa là 10 kí tự' })
        ]],
        classify: [{ value: null, disabled: this.isView }],
        sex: [{ value: null, disabled: this.isView }],
        soDKKD: [{ value: null, disabled: this.isView }],
        dateEstablish: [{ value: null, disabled: this.isView }],
        contact: [{ value: null, disabled: this.isView }],
        birthday: [{ value: null, disabled: this.isView }],
        email: [{ value: null, disabled: this.isView }, [GlobalValidate.mailFormat({ error: 'Mail không đúng dịnh dạng' })]],
        mobile: [{ value: null, disabled: this.isView }],
        website: [{ value: null, disabled: this.isView }],
        address: [{ value: null, disabled: this.isView }],
        fax: [{ value: null, disabled: this.isView }],
        note: [{ value: null, disabled: this.isView }],
      }),
      dataDb: this.fb.group({
        status: [{ value: true, disabled: this.isView }],
      })
    });
    if (this.id) {
      const rs = await this.sv.findOneById(this.id);
      this.ex.logDebug('Edit item', rs);
      if (rs.ok) {
        this.myForm.patchValue(rs.result);
      }
    }
    this.getlistPartGroup();
    this.getListCountry();
    this.getListEmp();
    this.getGender();
  }

  async submitForm(close: boolean = true) {
    super.submitForm();
    if (this.myForm.invalid) { return; }
    const body: any = this.myForm.value;
    console.log(body);
    body.dataDb.status = body.dataDb.status ? 1 : 0;
    this.isLoading = true;
    let result: any;

    const rs = this.id ? await this.sv.edit(this.id as number, body) : await this.sv.add(body);
    this.isLoading = false;
    if (rs.ok) {
      result = rs.result;
      this.message.success('Lưu thành công');
      close ? this.handleOk(result) : this.resetForm(result);
    } else {
      this.message.error('Lỗi! Lưu thất bại ');
      return;
    }
  }

  resetForm(data: any) {
    this.handleAdd(data);
    this.id = null;
    this.myForm.reset();
  }

  async getlistPartGroup() {
    const params: PagingModel = {
      page: 1,
      size: 100
    };
    const rs = await this.pgsv.get(params);
    if (rs.ok) {
      this.listPartGroup = rs.result.data.map(x => {
        return {
          id: x.id,
          name: x.data.partnerGroupNameVn
        };
      });
    }
  }

  async getListCountry() {
    const rs = await this.sv.getNational();
    if (rs.ok) {
      this.listCountry = rs.result.data.map(x => {
        return {
          id: x.id,
          name: x.data.fullNameVn
        };
      });
    }
  }

  async getGender() {
    const rs = await this.sv.getGender();
    console.log('gender neee', rs);
    if (rs.ok) {
      this.listGender = rs.result.data.map(x => {
        return {
          id: x.id,
          name: x.data.genderName
        };
      });
    }
  }

  async getListEmp() {
    const rs = await this.emp.get({});
    console.log('emp neee', rs);

    if (rs.ok) {
      this.listEmp = rs.result.data.map(x => {
        return {
          id: x.id,
          name: x.basic.fullName
        };
      });
    }
  }

  successMessage(type: string, text: string): void {
    this.message.create(type, text);
  }

  errorMessage(type: string, text: string): void {
    this.message.create(type, text);
  }


}
