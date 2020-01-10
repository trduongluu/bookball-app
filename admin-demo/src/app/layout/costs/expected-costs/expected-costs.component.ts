import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/_base/components/base-list-component';
import { DialogService } from 'src/app/_base/services/dialog.service';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { NzMessageService } from 'ng-zorro-antd';
import { ExtensionService } from 'src/app/_base/services/extension.service';
import { FormBuilder } from '@angular/forms';
import { ExpectedCostsService } from 'src/app/_shared/services/expected-costs.service';
import { ExpensesItemGroupService } from 'src/app/_shared/services/expenses-item-group.service';
import { ProjectGeneralService } from 'src/app/_shared/services/project-general.service';
import { formattedError } from '@angular/compiler';
import { ActualCostsService } from 'src/app/_shared/services/actual-costs.service';

@Component({
  selector: 'app-expected-costs',
  templateUrl: './expected-costs.component.html',
  styleUrls: ['./expected-costs.component.scss'],
  providers: [],
})
export class ExpectedCostsComponent extends BaseListComponent implements OnInit {

  public listProject: any[];
  public data: any[];
  constructor(
    private dl: DialogService,
    public exTableService: ExtentionTableService,
    private message: NzMessageService,
    private ex: ExtensionService,
    private fb: FormBuilder,
    private expectedService: ExpectedCostsService,
    private projectService: ProjectGeneralService,
    private actualCostsService: ActualCostsService
  ) {
    super();
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      searchText: null,
      searchProject: null
    });
    this.getProject();
    this.getData();
  }

  async getProject() {
    this.listProject = [];
    let rs = await this.projectService.get({ size: 200 });
    if (rs.ok) {
      this.listProject = rs.result.data.map(x => {
        return {
          id: x.id,
          name: x.projName
        }
      });
    }
  }

  async getData(page: number = 1) {
    this.data = [];
    this.paging.page = page;
    let param = { where: { and: [] } };
    let form = this.myForm.value;
    if (form.searchProject) {
      param.where.and.push({ "data.projectId": +form.searchProject });
    }


    if (form.searchText != null) {
      param.where.and.push({ or: [{ "data.costName": { like: this.ex.BoDau(form.searchText, null) } }] })
    }
    if (param.where.and.length > 0) {
      this.paging.where = param.where;
    }
    this.isLoading = true;
    let rs = await this.expectedService.get(this.paging);
    if (rs.ok) {
      rs.result.data.forEach(async x => {
        let actualCosts = await this.actualCostsService.findOne({
          where: {
            and: [{
              'data.costName': x.data.costName
            }, {
              'data.projectId': x.data.projectId
            }, {
              'data.expItenId': x.data.expItemId
            }]
          }
        });

        x.data.moneyOfActualCosts = (actualCosts.ok && actualCosts.result) ? (actualCosts.result.data.amountOfMoney * actualCosts.result.data.exchangeRate) : 0;
        x.data.difference= (x.data.amountOfMoney* x.data.exchangeRate) -x.data.moneyOfActualCosts;
        const item = {
          projId: x.data.projectId,
          projName: x.project ? x.project.projName : '',
          isShow: true,
          sum: (x.data.amountOfMoney * x.data.exchangeRate),
          sumActualCosts:   x.data.moneyOfActualCosts ,
          sumDifference:  x.data.difference,
          expectedCosts: [x]
        };
        const index = this.data.findIndex(i => i.projId === x.data.projectId);
        if (index === -1) {
          this.data.push(item)
        } else {
          this.data[index].expectedCosts.push(x);
          this.data[index].sum += (x.data.amountOfMoney * x.data.exchangeRate);
          this.data[index].sumActualCosts +=  x.data.moneyOfActualCosts;
          this.data[index].sumDifference += x.data.difference;
       
        }
      });
      this.listOfData = rs.result.data;
      this.paging = rs.result.paging;
    }
    this.isLoading = false;
    this.refreshStatus();
  }

  async deleteDialog(id: number) {
    const result = await this.dl.confirm('<i>Bạn có muốn xóa dữ liệu này không?</i>', '<b> </b>');
    if (result) {
      const rs = await this.expectedService.delete(id);
      this.ex.logDebug('Delete response', rs);
      if (rs.ok) {
        this.getData();
        this.message.success("Xóa dữ liệu thành công");
      }
    }
  }

  async deleteMulti() {
    let i = this.exTableService.getitemSelected(this.listOfData).length;
    const result = await this.dl.confirm(`Bạn có muốn xóa ${i > 1 ? 'những' : ''} dữ liệu này không?`, ' ');
    if (result) {
      const lstSelected = this.exTableService.getitemSelected(this.listOfData);
      const lstDeleting = [];
      for (const item of lstSelected) {
        const delObj = await this.expectedService.delete(item.id);
        lstDeleting.push(delObj);
      }
      await Promise.all(lstDeleting);
      this.exTableService.unselectAll(this.listOfData);
      this.message.success('Xóa dữ liệu thành công');
      this.getData();
    }  else{
      this.exTableService.unselectAll(this.listOfData);
    }
  }

  closeDataModal(value: any) {
    if (!!value) {
      this.getData();
    }
    super.closeDataModal(value);
  }

  addData(value: any) {
    if (!!value) {
      this.getData();
    }
  }

  handleAddNew(value: any) {
    if (!!value) {
      this.getData();
    }
  }
}
