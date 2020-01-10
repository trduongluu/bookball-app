import { Component, OnInit } from '@angular/core';
import { BaseDataComponent } from 'src/app/_base/components/base-data-component';
import { FormBuilder } from '@angular/forms';
import { GlobalValidate } from 'src/app/_base/class/global-validate';
import { ExtensionService } from 'src/app/_base/services/extension.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TargetDetailService } from 'src/app/_shared/services/target-detail.service';
import { PagingModel } from 'src/app/_base/models/response-model';
import { TargetService } from 'src/app/_shared/services/target.service';
@Component({
  selector: 'app-target-detail-data',
  templateUrl: './target-detail-data.component.html',
  styleUrls: ['./target-detail-data.component.scss']
})
export class TargetDetailDataComponent extends BaseDataComponent implements OnInit {
  public lisTarget = [];
  constructor(
    fb: FormBuilder,
    private ex: ExtensionService,
    private sv: TargetDetailService,
    private tgsv: TargetService,
    private message: NzMessageService
  ) {
    super(fb);
  }

  async ngOnInit() {
    this.initForm();
    await this.getLisTarget();
    await this.getDataFromId();
  }

  initForm() {
    this.createForm({
      data: this.fb.group({
        targetDetailNameVn: [{ value: null, disabled: this.isView }, [GlobalValidate.required({ error: 'Không được để trống' })]],
        idtarget: [{ value: null, disabled: this.isView }],
        stagePercent: [{ value: null, disabled: true }],
        stageIndex: [{ value: null, disabled: this.isView }, [GlobalValidate.MinLengthNumber(0, { error: 'Giá trị lớn hơn 0' })]],
        note: [{ value: null, disabled: this.isView }]
      }),
      dataDb: this.fb.group({
        status: [{ value: true }]
      })
    });
  }

  async getDataFromId() {
    if (this.id) {
      const rs = await this.sv.findOneById(this.id);
      this.ex.logDebug('Edit item', rs);
      if (rs.ok) {
        this.myForm.patchValue(rs.result);
        if (rs.result.data.idtarget) {
          this.myForm.get('data.stagePercent').enable();
        }
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

  async getLisTarget() {
    const params: PagingModel = {
      page: 1,
      size: 100,
      where: { and: [{ 'data.idtarget': null }] }
    };
    const rs = await this.sv.get(params);
    if (rs.ok) {
      console.log('data', rs.result);
      this.lisTarget = rs.result.data.map(x => {
        return {
          id: x.id,
          name: x.data.targetDetailNameVn
        };
      });
    }
  }

  createMessage(type: string, text: string): void {
    this.message.create(type, text);
  }

  togglePercent(event: any) {
    if (event) {
      this.myForm.get('data.stagePercent').enable();
    } else {
      this.myForm.get('data.stagePercent').reset();
      this.myForm.get('data.stagePercent').disable();
    }
  }
}
