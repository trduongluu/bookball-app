import { Component, OnInit } from '@angular/core';
import { BaseDataComponent } from 'src/app/_base/components/base-data-component';
import { FormBuilder, Validators } from '@angular/forms';
import { ProjectGeneralService } from 'src/app/_shared/services/project-general.service';
import { GlobalValidate } from 'src/app/_base/class/global-validate';
import { ExpectedCostsService } from 'src/app/_shared/services/expected-costs.service';
import { NzMessageService } from 'ng-zorro-antd';
import { ContractsService } from 'src/app/_shared/services/contracts.service';
import { Utilities } from 'src/app/_shared/extensions/utilities';
import { ExpensesItemService } from 'src/app/_shared/services/expenses-item.service';
import { isBoolean } from 'util';


@Component({
  selector: 'app-expected-costs-data',
  templateUrl: './expected-costs-data.component.html',
  styleUrls: ['./expected-costs-data.component.scss']
})
export class ExpectedCostsDataComponent extends BaseDataComponent implements OnInit {


  public openTab: number = 1;
  public listLog: any[] = [];
  public listCurrency = [{
    id: 'VND',
    name: 'VND'
  }, {
    id: 'USD',
    name: 'USD'
  }, {
    id: 'EUR',
    name: 'EUR'
  }, {
    id: 'JP',
    name: 'JP'
  }, {
    id: 'GBP',
    name: 'GBP'
  }];
  public listProject: any[];
  public listExpItemGroup: any[];
  public project: any;
  constructor(
    fb: FormBuilder,
    // private currencyService: CurrencyService,
    private projectService: ProjectGeneralService,
    private expensesItemService: ExpensesItemService,
    private expectedCostsService: ExpectedCostsService,
    private message: NzMessageService,
    private contractService: ContractsService
  ) {
    super(fb);
  }

  async ngOnInit() {
    this.createForm();
    const tasks = [this.getExpItemGroup(), this.getProject()];
    await Promise.all(tasks);
    this.listLog = [];
    await this.getData();

  }

  createForm() {
    this.myForm = this.fb.group({
      data: this.fb.group({
        currency: ['VND'],
        exchangeRate: [1],
        expItemId: [null, GlobalValidate.required({ error: 'Loại chi phí không được để trống' })],
        costName: [null, [GlobalValidate.required({ error: 'Tên chi phí không được để trống' }),
        GlobalValidate.space({ error: 'Tên chi phí không được để trống' }),
        GlobalValidate.MaxLength(250, { error: 'Tên chi phí không được vượt quá 250 ký tự' })]],
        percentage: [null],
        amountOfMoney: [null, GlobalValidate.required({ error: 'Số tiền không được để trống' })],
        projectId: [null, GlobalValidate.required({ error: 'Dự án không được để trống' })],
        note: [null, [GlobalValidate.MaxLength(2000, { error: 'Ghi chú không được vượt quá 2000 ký tự' })]]
      }),
      dataDb: this.fb.group({
        status: [1]
      }),
      other: this.fb.group({
        creatDate: [Utilities.DateNowUTC(), GlobalValidate.required({ error: 'Ngày tạo không được để trống' })],
        creatBy: [{ value: 'admin', disabled: true }, GlobalValidate.required({ error: 'Người tạo không được để trống' })],
        statusProject: [null],
        tsumContracts: [{ value: null, disabled: this.isView }],
      })
    });
    if (this.isView) { this.myForm.disable(); }
  }

  async getData() {
    if (this.id) {
      console.log(this.id);

      let rs = await this.expectedCostsService.findOneById(this.id);
      if (rs.ok) {
        this.myForm.patchValue(rs.result);
        this.updateByProject();
      }
    }
  }

  // async getCurrency() {
  //   this.listCurrency = [];
  //   let rs = await this.currencyService.get({ size: 200 });
  //   if (rs.ok) {
  //     ;
  //     this.listCurrency = rs.result.data.map(x => {
  //       x.id = x.iso;
  //       x.name = x.iso;
  //       return x;
  //     });
  //   }
  // }

  setAmountOfMoney() {
    let tsumContracts = this.myForm.get('other.tsumContracts').value;
    let percentage = this.myForm.get('data.percentage').value;
    this.myForm.patchValue({
      data: {
        amountOfMoney: (tsumContracts && percentage) ? (tsumContracts * (percentage / 100)) : null
      }
    });
  }

  async getProject() {
    this.listProject = [];
    let rs = await this.projectService.get({ size: 200 });
    if (rs.ok) {
      this.listProject = rs.result.data.map(x => {
        return {
          id: x.id,
          name: x.projName,
          statusName: x.status ? x.status.data.statusName : ''
        };
      });
    }
  }

  async updateByProject() {
    let sum = 0;
    let projectId = this.myForm.get('data.projectId').value;
    if (projectId) {
      let project = this.listProject.find(x => x.id === projectId);
      if (project) {
        let contract = await this.contractService.get({ where: { 'projId': projectId } });
        if (contract.ok) {
          contract.result.data.forEach(x => sum += x.contractValue);
        }
        this.myForm.patchValue({ other: { statusProject: project.statusName, tsumContracts: sum } });
      }
    } else {
      this.myForm.patchValue({ other: { statusProject: null, tsumContracts: null } });
    }
  }

  async getExpItemGroup() {
    this.listExpItemGroup = [];
    let rs = await this.expensesItemService.get({ size: 200 });
    if (rs.ok) {
      this.listExpItemGroup = rs.result.data.map(x => {
        x.name = x.data.expensesItemName;
        return x;
      });
    }
  }

  addNew(data = null) {
    this.handleAdd(data);
    this.createForm();
    this.id = null;
  }

  async submit(close: boolean = true) {
    super.submitForm();
    this.myForm.patchValue({
      data: {
        costName: this.myForm.get('data.costName').value ? this.myForm.get('data.costName').value.trim() : null,
        note: this.myForm.get('data.note').value ? this.myForm.get('data.note').value.trim() : null,
      }
    });
    // const tabFocus = this.validateTab(this.myForm);
    // if (tabFocus) { this.openTab = tabFocus; }
    if (this.myForm.invalid) return;
    let form = this.myForm.value;
    form.dataDb.status = isBoolean(form.dataDb.status) ? (form.dataDb.status === true ? 1 : 0) : form.dataDb.status;
    delete form.other
    let param = {
      where: {
        and: [
          { 'data.costName': form.data.costName },
          { 'data.projectId': form.data.projectId },
          { 'id': { neq: this.id } }
        ]
      }
    };
    if (!this.id) {
      param.where.and.pop();
    }
    let checkName = await this.expectedCostsService.get(param);
    if (checkName.ok && checkName.result.data.length > 0) {
      this.myForm.get('data.costName').setErrors({ error: 'Tên chi phí đã tồn tại' });
      document.getElementById('costName').focus();
      return;
    }
    let rs = this.id ? await this.expectedCostsService.edit(+this.id, form) : await this.expectedCostsService.add(form);
    if (rs.ok) {
      this.message.success('Lưu thành công');
      close ? this.handleOk(rs.result) : this.addNew(rs.result);
    }
    else {
      this.message.error('Lỗi! Lưu thất bại ');
      return;
    }
  }


}
