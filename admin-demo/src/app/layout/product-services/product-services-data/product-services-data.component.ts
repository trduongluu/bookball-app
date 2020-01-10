import { Component, OnInit } from '@angular/core';
import { BaseDataComponent } from 'src/app/_base/components/base-data-component';
import { FormBuilder } from '@angular/forms';
import { GlobalValidate } from 'src/app/_base/class/global-validate';
import { ExtensionService } from 'src/app/_base/services/extension.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProductServicesService } from 'src/app/_shared/services/product-services.service';

@Component({
  selector: 'app-product-services-data',
  templateUrl: './product-services-data.component.html',
  styleUrls: ['./product-services-data.component.scss']
})
export class ProductServicesDataComponent extends BaseDataComponent implements OnInit {
  public lsType: any[] = [
    { id: 1, name: 'Sản phẩm' },
    { id: 2, name: 'Dịch vụ' }
  ];
  constructor(
    fb: FormBuilder,
    private ex: ExtensionService,
    private sv: ProductServicesService,
    private message: NzMessageService
  ) {
    super(fb);
  }

  async ngOnInit() {
    this.createForm({
      data: this.fb.group({
        prodServNameVN: [null, [
          GlobalValidate.required({ error: 'Không được để trống' }),
          GlobalValidate.MaxLength(250, { error: 'Tên SP/DV không được vượt quá 250 ký tự' })
        ]],
        prodServCode: [null, [
          GlobalValidate.required({ error: 'Không được để trống' }),
          GlobalValidate.MaxLength(16, { error: 'Mã SP/DV không được vượt quá 16 ký tự' })
        ]],
        prodServ: [this.lsType[0].id],
        note: [null, [
          GlobalValidate.MaxLength(2000, { error: 'Ghi chú không được vượt quá 2000 ký tự' })
        ]],
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

  successMessage(type: string, text: string): void {
    this.message.create(type, text);
  }

  errorMessage(type: string, text: string): void {
    this.message.create(type, text);
  }

}
