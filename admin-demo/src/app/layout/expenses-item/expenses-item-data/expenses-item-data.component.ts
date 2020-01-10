import { Component, OnInit } from '@angular/core';
import { BaseDataComponent } from 'src/app/_base/components/base-data-component';
import { FormBuilder } from '@angular/forms';
import { GlobalValidate } from 'src/app/_base/class/global-validate';
import { ExtensionService } from 'src/app/_base/services/extension.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ExpensesItemService } from 'src/app/_shared/services/expenses-item.service';
import { PagingModel } from 'src/app/_base/models/response-model';
import { ExpensesItemGroupService } from 'src/app/_shared/services/expenses-item-group.service';
@Component({
  selector: 'app-expenses-item-data',
  templateUrl: './expenses-item-data.component.html',
  styleUrls: ['./expenses-item-data.component.scss']
})
export class ExpensesItemDataComponent extends BaseDataComponent implements OnInit {
  public listItemGroup = [];
  constructor(
    fb: FormBuilder,
    private ex: ExtensionService,
    private sv: ExpensesItemService,
    private message: NzMessageService,
    private gpsv: ExpensesItemGroupService
  ) {
    super(fb);
  }

  async ngOnInit() {
    this.createForm({
      data: this.fb.group({
        expItemGroup: [{ value: null, disabled: this.isView }, [GlobalValidate.required({ error: 'Không được để trống' })]],
        expensesItemName: [{ value: null, disabled: this.isView }, [GlobalValidate.required({ error: 'Không được để trống' })]],
        expensesItemIndex: [{ value: null, disabled: this.isView }],
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
    this.getlistItemGroup();
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

  async getlistItemGroup() {
    const params: PagingModel = {
      page: 1,
      size: 100
    };
    const rs = await this.gpsv.get(params);

    if (rs.ok) {
      this.listItemGroup = rs.result.data.map(x => {
        return {
          id: x.id,
          name: x.data.expensesItemGroupName
        };
      });
    }
    console.log('listItemGroup', this.listItemGroup);
  }

  successMessage(type: string, text: string): void {
    this.message.create(type, text);
  }

  errorMessage(type: string, text: string): void {
    this.message.create(type, text);
  }

}
