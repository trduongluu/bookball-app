import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/_base/components/base-list-component';
import { FormBuilder } from '@angular/forms';
import { ActualCostsService } from 'src/app/_shared/services/actual-costs.service';
import { ProjectGeneralService } from 'src/app/_shared/services/project-general.service';
import { ScrollService } from 'src/app/_base/services/scroll.service';
import { DialogService } from 'src/app/_base/services/dialog.service';
import { NzMessageService } from 'ng-zorro-antd';
import { ExtensionService } from 'src/app/_base/services/extension.service';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { ExpectedCostsService } from 'src/app/_shared/services/expected-costs.service';

@Component({
  selector: 'app-actual-costs',
  templateUrl: './actual-costs.component.html',
  styleUrls: ['./actual-costs.component.scss'],
  providers: [ScrollService]
})
export class ActualCostsComponent extends BaseListComponent implements OnInit {

  listProject: any[];
  data: any[];

  constructor(private fb: FormBuilder,
    private actualCostsService: ActualCostsService,
    private projectService: ProjectGeneralService,
    private scrollService: ScrollService,
    private dl: DialogService,
    private message: NzMessageService,
    private ex: ExtensionService,
    public exTableService: ExtentionTableService,
    private expectedCostsService: ExpectedCostsService
  ) {
    super();
  }

  async ngOnInit() {
    this.scrollService.scrollToTop();

    this.myForm = this.fb.group({
      searchText: null,
      searchProject: null
    });
    this.getProject();
    await this.getData();
  }

  async getData(page = 1) {
    this.data = [];
    this.isLoading = true;
    this.paging.page = page;
    this.paging.order = [{ "vouchersNumber": false }, { "data.projectId": false }];
    let param = { where: { and: [] } };
    let form = this.myForm.value;
    if (form.searchProject) {
      param.where.and.push({ "data.projectId": +form.searchProject });
    }
    if (form.searchText) {
      param.where.and.push({ or: [{ "vouchersNumber": form.searchText }, { "data.costName": { like: this.ex.BoDau(form.searchText, null) } }, { "contract.contractCode": form.searchText }] })
    }
    if (param.where.and.length > 0) {
      this.paging.where = param.where;
    }
    let rs = await this.actualCostsService.get(this.paging);
    if (rs.ok) {
      rs.result.data.forEach(async x => {
        x.id = x.vouchersNumber;
        x.isHidden = x.dataDb.status;
        let expectedCosts = await this.expectedCostsService.findOne({ where: { and: [{ 'data.expItemId': x.data.expItenId }, { 'data.costName': x.data.costName }, { 'data.projectId': x.data.projectId }] } });

        x.data.moneyOfExpectedCosts = (expectedCosts.ok && expectedCosts.result) ? (expectedCosts.result.data.amountOfMoney * expectedCosts.result.data.exchangeRate) : 0;
        x.data.difference = x.data.moneyOfExpectedCosts- (x.data.amountOfMoney * (x.data.exchangeRate > 0 ? x.data.exchangeRate : 1)) ;

        const item = {
          projId: x.data.projectId,
          projName: x.project ? x.project.projName : '',
          isShow: true,
          sum: x.data.amountOfMoney,
          sumExpected: x.data.moneyOfExpectedCosts,
          sumDifference: x.data.difference,
          actualCosts: [x]
        };
        const index = this.data.findIndex(i => i.projId === x.data.projectId);
        if (index === -1) {
          this.data.push(item)
        } else {
          this.data[index].actualCosts.push(x);
          this.data[index].sum += (x.data.amountOfMoney * (x.data.exchangeRate > 0 ? x.data.exchangeRate : 1));
          this.data[index].sumExpected += x.data.moneyOfExpectedCosts;
          this.data[index].sumDifference += x.data.difference;

        }

      });
      this.listOfData = rs.result.data;
      this.paging = rs.result.paging;
      console.log(this.listOfData, this.data);

      this.isLoading = false;
      this.refreshStatus();
    }
  }

  async getProject() {
    this.listProject = [];
    const rs = await this.projectService.get({ size: 200 });
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

  async deleteDialog(id: number) {
    console.log('delete id', id);
    const result = await this.dl.confirm('<i>Bạn có muốn xóa dữ liệu này không?</i>', '<b> </b>');
    if (result) {
      const rs = await this.actualCostsService.delete(id);
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
        const delObj = await this.actualCostsService.delete(item.id);
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

  async updateStatus(item: any, status: number) {
    const changeVal = 1 - status;
    const rs = await this.actualCostsService.patch(item.id, { dataDb: { status: changeVal } });
    if (rs.ok) {
      item.dataDb.status = changeVal;
      item.isHidden = !!!item.isHidden;
    } else {
      this.dl.error('Lỗi hệ thống', 'Dữ liệu của bạn không cập nhật thành công do lỗi hệ thống');
    }
  }
}
