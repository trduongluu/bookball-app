import { Component, OnInit, Input } from '@angular/core';
import { BaseDataComponent } from 'src/app/_base/components/base-data-component';
import { FormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { ActtachmentsService } from 'src/app/_shared/services/acttachments.service';
import { GlobalValidate } from 'src/app/_base/class/global-validate';
import { StorageCabinetsService } from 'src/app/_shared/services/storage-cabinets.service';
import { Utilities } from 'src/app/_shared/extensions/utilities';

@Component({
  selector: 'app-project-document-data',
  templateUrl: './project-document-data.component.html',
  styleUrls: ['./project-document-data.component.scss']
})
export class ProjectDocumentDataComponent extends BaseDataComponent implements OnInit {

  @Input() projGeneralId: number;
  @Input() packageBidId: number;
  @Input() biddingDocumentId: number;
  @Input() contractId: number;
  @Input() projWorkId: number;
  @Input() issueId: number;
  @Input() item: any;
  public listCabin: any[] = [];
  constructor(
    fb: FormBuilder,
    private message: NzMessageService,
    private acttachmentService: ActtachmentsService,
    private storageCabinService: StorageCabinetsService
  ) {
    super(fb);
  }

  async ngOnInit() {
    await this.getStoreCabin();
    this.createForm();
    if (this.item) {
      console.log('item', this.item);
      this.myForm.patchValue({ file: { url: this.item.fileData.fileData }, fileData: this.item.fileData });
    }
  }

  async getStoreCabin() {
    const rs = await this.storageCabinService.get({ size: 100, where: { 'dataDb.status': 1 } });
    if (rs.ok) {
      this.listCabin = rs.result.data.map(x => {
        return {
          id: x.id,
          name: x.data.cabinetName
        };
      });
    }
  }

  createForm() {
    this.myForm = this.fb.group({
      file: null,
      fileData: this.fb.group({
        projGeneral: [this.projGeneralId],
        biddingDocument: [this.biddingDocumentId],
        packageBids: [this.packageBidId],
        contracts: [this.contractId],
        projWorks: [this.projWorkId],
        issue: [this.issueId],
        capacity: [0],
        version: [0],
        fileName: [null, GlobalValidate.required({ error: 'Tên file không được để trống' })],
        fileData: [null, GlobalValidate.required({ error: 'File không được để trống' })],
        description: [null],
        uploadDate: [Utilities.DateNowUTC()],
        linkIn: [null],
        linkOut: [null],
        fileId: [null],
        createdBy: [null],
        key: [null],
        storageCabinId: [null]
      }),
      dataDb: this.fb.group({
        status: [1]
      })
    });
  }

  async updateFile(event = null) {
    if (!event) {
      const file = this.myForm.get('file').value;
      this.myForm.patchValue({
        fileData:
          { fileData: file.url, capacity: file.size, fileId: file.id, uploadDate: file.createdDate, fileName: file.name }
      });
    } else {
      this.myForm.patchValue({ fileData: { fileData: null, capacity: null } });
    }
  }
  updateLinkIn() {
    const linkIn = this.myForm.get('fileData.linkIn').value;
    if (linkIn) {
      const name = this.data.find(x => x.id === linkIn);
      delete name.uploadDate;
      this.myForm.patchValue({
        fileData: name
      });
    } else {
      this.myForm.patchValue({ fileData: { fileName: '' } });
    }
    console.log(this.myForm.value);
  }

  async submit() {
    super.submitForm();
    if (this.myForm.invalid) { return; }
    console.log(this.item);

    const rs = ((!this.item) ? await this.acttachmentService.add(this.myForm.value)
      : await this.acttachmentService.edit(this.item.id, this.myForm.value));
    if (rs.ok) {
      this.message.success('Lưu thành công');
      if (close) {
        this.handleOk(rs.result);
      }
      this.id = rs.result.id;
    } else {
      this.message.error('Lỗi! Lưu thất bại');
    }
  }
}
