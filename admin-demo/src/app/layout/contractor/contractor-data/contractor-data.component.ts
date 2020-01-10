import { Component, OnInit } from '@angular/core';
import { BaseDataComponent } from 'src/app/_base/components/base-data-component';
import { FormBuilder } from '@angular/forms';
import { GlobalValidate } from 'src/app/_base/class/global-validate';
import { ExtensionService } from 'src/app/_base/services/extension.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ContractorService } from 'src/app/_shared/services/contractor.service';

@Component({
  selector: 'app-contractor-data',
  templateUrl: './contractor-data.component.html',
  styleUrls: ['./contractor-data.component.scss']
})
export class ContractorDataComponent extends BaseDataComponent implements OnInit {

  constructor(
    fb: FormBuilder,
    private ex: ExtensionService,
    private sv: ContractorService,
    private message: NzMessageService
  ) {
    super(fb);
  }

  async ngOnInit() {
    this.createForm({
      data: this.fb.group({
        contractorName: [null, [
          GlobalValidate.required({ error: 'Không được để trống' }),
          // tslint:disable-next-line: max-line-length
          GlobalValidate.regularNotExpression('[!@#$%^&*-,/]|<\\s*[a-z][^>]*>(.*?)<\\s*/\\s*[a-z]+>', { error: 'Không được chứa ký tự đặc biệt' }),
          GlobalValidate.MaxLength(250, { error: 'Không được vượt quá 250 ký tự' })
        ]],
        contractorIndex: [null],
        note: [null],
      }),
      dataDb: this.fb.group({
        status: [true],
      })
    });
    if (this.isView) {
      this.myForm.disable();
    }
    if (this.id) {
      const rs = await this.sv.findOneById(this.id);
      this.ex.logDebug('Edit item', rs);
      if (rs.ok) {
        this.myForm.patchValue(rs.result);
      }
    }
  }

  setValidateContractorName(body: any) {
    this.myForm.get('data.contractorName').setErrors( { error: body });
    document.getElementById('contractorName').focus();
  }

  async submitForm(close: boolean = true) {
    super.submitForm();
    if (this.myForm.invalid) { return; }
    const body: any = this.myForm.value;
    console.log(body);
    body.dataDb.status = body.dataDb.status ? 1 : 0;
    this.isLoading = true;

    const rs = this.id ? await this.sv.edit(this.id as number, body) : await this.sv.add(body);
    this.isLoading = false;
    if (rs.ok) {
      this.data = rs.result;
      this.message.success('Lưu thành công');
      close ? this.handleOk(this.data) : this.resetForm(this.data);
    } else {
      console.log(rs.errors);
      if (rs.errors.error.contractorName) {
        this.setValidateContractorName(rs.errors.error.contractorName);
      } else {
        this.message.error('Lỗi! Lưu thất bại ');
      }
      return;
    }
  }

  resetForm(data: any) {
    this.handleAdd(data);
    this.id = null;
    this.myForm.reset();
  }

  successMessage(type: string, text: string): void {
    this.message.create(type, text);
  }

  errorMessage(type: string, text: string): void {
    this.message.create(type, text);
  }

}
