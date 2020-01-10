import { Component, OnInit } from '@angular/core';
import { BaseDataComponent } from 'src/app/_base/components/base-data-component';
import { FormBuilder } from '@angular/forms';
import { GlobalValidate } from 'src/app/_base/class/global-validate';
import { ExtensionService } from 'src/app/_base/services/extension.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BizModelService } from 'src/app/_shared/services/biz-model.service';

@Component({
  selector: 'app-biz-model-data',
  templateUrl: './biz-model-data.component.html',
  styleUrls: ['./biz-model-data.component.scss']
})
export class BizModelDataComponent extends BaseDataComponent implements OnInit {

  constructor(
    fb: FormBuilder,
    private ex: ExtensionService,
    private sv: BizModelService,
    private message: NzMessageService
  ) {
    super(fb);
  }

  async ngOnInit() {
    this.createForm({
      data: this.fb.group({
        bizModeCode: [null, [
          GlobalValidate.required({ error: 'Không được để trống' }),
          GlobalValidate.MaxLength(16, { error: 'Mã loại hình không được vượt quá 16 ký tự' })
        ]],
        bizModeNameVn: [null, [
          GlobalValidate.required({ error: 'Không được để trống' }),
          GlobalValidate.MaxLength(250, { error: 'Tên loại hình không được vượt quá 250 ký tự' }),
          // tslint:disable-next-line: max-line-length
          GlobalValidate.regularNotExpression('[!@#$%^&*-,/]|<\\s*[a-z][^>]*>(.*?)<\\s*/\\s*[a-z]+>', { error: 'Tên loại hình không được chứa ký tự đặc biệt' })
        ]],
        note: [null, [
          GlobalValidate.MaxLength(2000, { error: 'Ghi chú không được vượt quá 2000 ký tự' })
        ]],
      }),
      dataDb: this.fb.group({
        status: [true]
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
      this.message.error('Lỗi! Lưu thất bại ');
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
