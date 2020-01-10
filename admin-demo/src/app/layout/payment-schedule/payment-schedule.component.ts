import { Component, OnInit, Input } from '@angular/core';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { BaseListComponent } from 'src/app/_base/components/base-list-component';
import { DialogService } from 'src/app/_base/services/dialog.service';
import { NzMessageService } from 'ng-zorro-antd';
import { PaymentScheduleService } from 'src/app/_shared/services/payment-schedule.service';

@Component({
  selector: 'app-payment-schedule',
  templateUrl: './payment-schedule.component.html',
  styleUrls: ['./payment-schedule.component.scss']
})
export class PaymentScheduleComponent extends BaseListComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input() contractId = 0;
  @Input() projectId: number;
  @Input() handoverId = 0;
  @Input() isViewContracts: boolean;
  public paging: any = {
    page: 1,
    size: 20
  };
  public data: any;
  public item: any;
  constructor(
    private paymentScheduleService: PaymentScheduleService,
    private dl: DialogService,
    private message: NzMessageService,
    public exTableService: ExtentionTableService) {
    super();
  }

  ngOnInit() {
    this.getData();
  }

  openModal(item: any, isview = null) {
    super.openDataModal(null, isview);
    this.item = item;
  }

  async  getData(page = 1) {
    this.data = null;
    this.listOfData = [];
    this.isLoading = true;
    if (this.contractId) {
      const rs = this.handoverId
        ? await this.paymentScheduleService.get({ where: { handoverId: this.handoverId } })
        : await this.paymentScheduleService.get({ where: { contractId: this.contractId } });
      if (rs.ok) {
        this.listOfData = rs.result.data;
      }
    }
    this.isLoading = false;
  }

  async  deleteItem(id) {
    const result = await this.dl.confirm('<i>Bạn có muốn xóa dữ liệu này không?</i>', '<b> </b>');
    if (result) {
      const rs = await this.paymentScheduleService.delete(id);
      if (rs.ok) {
        this.getData(this.paging.page);
        this.message.success('Xóa dữ liệu thành công');
      } else {
        this.message.error('Lỗi! Xóa dữ liệu thất bại');
      }
    }
  }

  closeDataModal(value: any) {
    if (!!value) {
      this.getData(this.paging.page);
    }
    super.closeDataModal(value);
  }

  addData(value: any) {
    if (!!value) {
      this.getData(this.paging.page);
    }
  }
}
