import { Component, OnInit } from '@angular/core';
import { BaseDataComponent } from 'src/app/_base/components/base-data-component';
import { FormBuilder } from '@angular/forms';
import { ExtensionService } from 'src/app/_base/services/extension.service';
import { FieldService } from 'src/app/_shared/services/field.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GlobalValidate } from 'src/app/_base/class/global-validate';

@Component({
  selector: 'app-field-data',
  templateUrl: './field-data.component.html',
  styleUrls: ['./field-data.component.scss']
})
export class FieldDataComponent extends BaseDataComponent implements OnInit {

  public listPositionType = [];
  constructor(
    fb: FormBuilder,
    private ex: ExtensionService,
    private sv: FieldService,
    private message: NzMessageService
  ) {
    super(fb);
  }

  async ngOnInit() {
    this.createForm({
      data: this.fb.group({
        pitchId: [{ value: null, disabled: this.isView }, [GlobalValidate.required({ error: 'Không được để trống' })]],
        name: [{ value: null, disabled: this.isView }],
        fieldType: [{ value: null, disabled: this.isView }],
      }),
      // dataDb: this.fb.group({
      //   status: [{ value: true, disabled: this.isView }]
      // })
    });
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
