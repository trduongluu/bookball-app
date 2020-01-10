import { Component, OnInit } from '@angular/core';
import { BaseDataComponent } from 'src/app/_base/components/base-data-component';
import { FormBuilder } from '@angular/forms';
import { GlobalValidate } from 'src/app/_base/class/global-validate';
import { ExtensionService } from 'src/app/_base/services/extension.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProjectProfileDetailService } from 'src/app/_shared/services/project-profile-detail.service';
import { PagingModel } from 'src/app/_base/models/response-model';
import { ProjectProfileService } from 'src/app/_shared/services/project-profile.service';
@Component({
  selector: 'app-project-profile-detail-data',
  templateUrl: './project-profile-detail-data.component.html',
  styleUrls: ['./project-profile-detail-data.component.scss']
})
export class ProjectProfileDetailDataComponent extends BaseDataComponent implements OnInit {
  public listProjProfile = [];
  public lstIdStt = [
    { id: 1, name: 'Ý tưởng' },
    { id: 2, name: 'Chuẩn bị' },
    { id: 3, name: 'Kế hoạch' },
    { id: 4, name: 'Đang triển khai' },
    { id: 5, name: 'Đang hoàn thành' },
    { id: 6, name: 'Hoàn thành' },
    { id: 7, name: 'Đang đánh giá' },
    { id: 8, name: 'Đã đóng' },
  ];
  constructor(
    fb: FormBuilder,
    private ex: ExtensionService,
    private sv: ProjectProfileDetailService,
    private prsv: ProjectProfileService,
    private message: NzMessageService
  ) {
    super(fb);
  }

  async ngOnInit() {
    this.createForm({
      data: this.fb.group({
        profDetailNameVn: [{ value: null, disabled: this.isView }, [GlobalValidate.required({ error: 'Không được để trống' })]],
        idProjProfile: [{ value: null, disabled: this.isView }],
        idStatus: [{ value: null, disabled: this.isView }],
        profileDtlIndex: [{ value: null, disabled: this.isView }],
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
    this.getlistProjProfile();
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

  async getlistProjProfile() {
    const params: PagingModel = {
      page: 1,
      size: 100,
      where: { and: [{ 'data.idProjProfile': null }] }
    };
    const rs = await this.sv.get(params);
    if (rs.ok) {
      this.listProjProfile = rs.result.data.map(x => {
        return {
          id: x.id,
          name: x.data.profDetailNameVn
        };
      });
    }
  }

  successMessage(type: string, text: string): void {
    this.message.create(type, text);
  }

  errorMessage(type: string, text: string): void {
    this.message.create(type, text);
  }

}
