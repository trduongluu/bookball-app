import { Component, OnInit, Input } from '@angular/core';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { BaseListComponent } from 'src/app/_base/components/base-list-component';
import { ActtachmentsService } from 'src/app/_shared/services/acttachments.service';
import { DialogService } from 'src/app/_base/services/dialog.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-project-document',
  templateUrl: './project-document.component.html',
  styleUrls: ['./project-document.component.scss']
})
export class ProjectDocumentComponent extends BaseListComponent implements OnInit {

  @Input() projGeneralId: number;
  @Input() packageBidId: number;
  @Input() biddingDocumentId: number;
  @Input() contractId: number;
  @Input() projWorkId: number;
  @Input() isView: boolean;
  @Input() issueId: number;

  public data: any;
  public item: any;
  constructor(
    private acttachmentService: ActtachmentsService,
    private dl: DialogService,
    private message: NzMessageService,
    public exTableService: ExtentionTableService) {
    super();
  }

  ngOnInit() {
    this.getData();
  }

  openModal(item = null, isView = false) {
    this.item = item;
    this.id = item ? item.id : null;
    this.isView = isView;
    this.isShowModalData = true;
  }

  async  getData(page = 1) {
    this.data = null;
    this.listOfData = [];
    this.paging.page = page;
    // wwhere theo du lieu dau vao
    const where = { and: [] };
    if (this.projGeneralId) { where.and.push({ 'fileData.projGeneral': this.projGeneralId }); }
    if (this.biddingDocumentId) { where.and.push({ 'fileData.biddingDocument': this.biddingDocumentId }); }
    if (this.packageBidId) { where.and.push({ 'fileData.packageBids': this.packageBidId }); }
    if (this.contractId) { where.and.push({ 'fileData.contracts': this.contractId }); }
    if (this.projWorkId) { where.and.push({ 'fileData.projWorks': this.projWorkId }); }
    if (this.issueId) { where.and.push({ 'fileData.issue': this.issueId }); }
    if (where.and.length > 0) {
      this.paging.where = where;
    } else {
      return;
    }
    this.isLoading = true;
    const rs = await this.acttachmentService.get(this.paging);
    this.isLoading = false;
    if (rs.ok) {
      console.log('Get tai lieu', rs.result.data);
      this.data = rs.result.data;
      if (this.data) {
        this.listOfData = this.data;
        this.paging = rs.result.paging;
      }
    }

  }

  async deleteItem(id: number) {
    const result = await this.dl.confirm('<i>Bạn có muốn xóa dữ liệu này không?</i>', '<b>Some descriptions</b>');
    if (result) {
      console.log(id);
      const rs = await this.acttachmentService.delete(id);
      if (rs.ok) {
        this.getData(this.paging.page);
        this.message.success('Xóa dữ liệu thành công');
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

  isDisable() {
    if (this.isView) {
      return true;
    } else {
      if (this.projGeneralId && (this.packageBidId || this.biddingDocumentId || this.contractId || this.projWorkId || this.issueId)) {
        return false;
      } else {
        return true;
      }
    }
  }
}
