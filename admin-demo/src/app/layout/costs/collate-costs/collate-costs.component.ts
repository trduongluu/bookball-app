import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ExtensionService } from '../../../_base/services/extension.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from '../../../_base/services/dialog.service';
import { ExtentionTableService } from '../../../_base/services/extention-table.service';
import { ProjectGeneralService } from '../../../_shared/services/project-general.service';
import { CollateCostsService } from '../../../_shared/services/collate-costs.service';
import { BaseListComponent } from '../../../_base/components/base-list-component';
import { ActualCostsService } from 'src/app/_shared/services/actual-costs.service';
@Component({
  selector: 'app-collate-costs',
  templateUrl: './collate-costs.component.html',
  styleUrls: ['./collate-costs.component.scss']
})
export class CollateCostsComponent extends BaseListComponent implements OnInit {
  public checkbox = true;
  public allChecked = false;
  public listProject: any[];
  public myForm: FormGroup;
  public isLoading: boolean;
  public listOfData: any[];
  public data: any[];
  public link: any;
  public location: any;
  public id: any;
  public isView: boolean;
  public vouchersNumber: any;

  constructor(
    private dl: DialogService,
    public exTableService: ExtentionTableService,
    private message: NzMessageService,
    private ex: ExtensionService,
    private fb: FormBuilder,
    private projectService: ProjectGeneralService,
    private collateCostService: CollateCostsService,
    private actualCostsService:ActualCostsService
  ) {
    super();
  }

  async ngOnInit() {
    await this.getProject();
    this.createForm();
    await this.getData();
  }
  createForm() {
    this.myForm = this.fb.group({
      searchText: [null],
      searchProject: [null]
    });
  }

  async getProject() {
    this.listProject = [];
    const rs = await this.projectService.get({});
    console.log(rs);

    if (rs.ok) {
      this.listProject = rs.result.data.map(x => {
        return {
          id: x.id,
          name: x.projName
        };
      });
    }
  }

  async getData(page = 1) {
    this.data = [];
    this.paging.page = page;
    const param = { where: { and: [] } };
    const form = this.myForm.value;
    if (form.searchProject) {
      param.where.and.push({ 'data.projectId': + form.searchProject });
    }
    if (form.searchText) {
      param.where.and.push({ or: [{ 'vouchersNumber':  form.searchText  },{ 'data.content': {like: this.ex.BoDau( form.searchText)} }] });
    }
    if (param.where.and.length > 0) {
      this.paging.where = param.where;
    }

    const res = await this.collateCostService.get(this.paging);
    if (res.ok) {
      console.log(res.result);

      res.result.data.forEach(async x => {
        x.id=x.vouchersNumber;
        const project = await this.projectService.findOneById(x.data.projectId);
        if (project.result) {
          x.data.projectName = project.result.projName;
        }
        x.isHidden = x.dataDb.status;
        x.toggle = 'close-text';
        let actualCosts = await this.actualCostsService.findOne({
          where: {
            and: [{
              'data.costName': x.data.content
            }, {
              'data.projectId': x.data.projectId
            }, {
              'data.expItenId': x.data.expItenId
            }]
          }
        });

        x.data.moneyOfActualCosts = (actualCosts.ok && actualCosts.result) ? (actualCosts.result.data.amountOfMoney * actualCosts.result.data.exchangeRate) : 0;
        x.data.difference= (x.data.amountOfMoney* x.data.exchangeRate) - x.data.moneyOfActualCosts;
        const item = {
          projId: x.data.projectId,
          projName: x.data.projectName ? x.data.projectName : '',
          isShow: true,
          sum: x.data.amountOfMoney,
          sumActual: x.data.moneyOfActualCosts,
          sumDifference: x.data.difference,
          collate: [x]
        };
        const index = this.data.findIndex(i => i.projId === x.data.projectId);
        if (index === -1) {
          this.data.push(item);
        } else {
          this.data[index].collate.push(x);
          this.data[index].sum += (x.data.amountOfMoney * (x.data.exchangeRate > 0 ? x.data.exchangeRate : 1));
          this.data[index].sumActual += x.data.moneyOfActualCosts;
          this.data[index].sumDifference += x.data.difference;
        }
      });
      this.listOfData = res.result.data;
      this.paging = res.result.paging;

    }
    this.isLoading = false;
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


  async deleteDialog(id: number) {
    console.log('delete id', id);
    const result = await this.dl.confirm('<i>Bạn có muốn xóa dữ liệu này không?</i>', '<b> </b>');
    if (result) {
      const rs = await this.collateCostService.delete(id);
      this.ex.logDebug('Delete response', rs);
      if (rs.ok) {
        this.getData();
        this.message.success('Xóa dữ liệu thành công');
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
        const delObj = await this.collateCostService.delete(item.id);
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
}
