import { Component, OnInit, Input } from '@angular/core';
import { BaseDataComponent } from '../../../_base/components/base-data-component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalValidate } from '../../../_base/class/global-validate';
import { ExtensionService } from '../../../_base/services/extension.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CrService } from '../../../_shared/services/cr.service';

import { ProjectGeneralService } from '../../../_shared/services/project-general.service';
@Component({
  selector: 'app-cr-data',
  templateUrl: './cr-data.component.html',
  styleUrls: ['./cr-data.component.scss']
})
export class CrDataComponent extends BaseDataComponent implements OnInit {
  @Input() projGenId: number;
  public lstclassifyCR = [];
  public myForm: FormGroup;
  public listProject: any[];
  public isLoad: boolean = true;
  public isView: boolean;
  public isSubmit: boolean;
  public id: number;
  public idEdit;
  public openTab = 1;
  constructor(
    fb: FormBuilder,
    public projGeneralService: ProjectGeneralService,
    public crService: CrService,
    private ex: ExtensionService,
    private sv: CrService,
    private message: NzMessageService
  ) {
    super(fb);
  }

  async ngOnInit() {
    await this.getProject();

    await this.getListclassifyCR();
    this.createForm();
    this.openTab = 1;
    await this.getData();
  }
  createForm() {
    this.myForm = this.fb.group({
      projId: [{ value: null, disabled: this.isView }, [GlobalValidate.required({ error: 'Không được để trống' })]],
      crtypeId: [{ value: null, disabled: this.isView }, [GlobalValidate.required({ error: 'Không được để trống' })]],
      oldValue: [{ value: null, disabled: this.isView }],
      newValue: [{ value: null, disabled: this.isView }],
      note: [{ value: null, disabled: this.isView }],
    })
  }

  async getData() {
    if (this.id) {
      let rs = await this.crService.findOneById(this.id);
      if (rs.ok) {
        this.myForm.patchValue(rs.result);
      }
    }
    if (this.projGenId) {
      //this.myForm.patchValue({ projId: this.projGenId });
      this.myForm.get('projId').setValue(this.projGenId);
    }
  }


  async getProject() {
    this.listProject = [];
    let rs = await this.projGeneralService.get({});
    if (rs.ok) {
      rs.result.data.forEach(item => {
        this.listProject.push({
          id: item.id,
          name: item.projName
        });
      });
    }
  }
  async submit() {
    super.submitForm();
    if (this.myForm.invalid) return;

    let rs = ((!this.id) ? await this.crService.add(this.myForm.value) : await this.crService.edit(this.id, this.myForm.value));
    console.log(rs);
    if (rs.ok) {
      this.message.success('Lưu thành công');
      this.id = rs.result.id;
      this.handleOk(rs.result);
    }
    else this.message.success('Lỗi! Lưu thất bại');
  }
  async getListclassifyCR() {

    const rs = await this.sv.getListCrType();
    if (rs.ok) {
      this.lstclassifyCR = rs.result;
    }
  }

  successMessage(type: string, text: string): void {
    this.message.create(type, text);
  }

  errorMessage(type: string, text: string): void {
    this.message.create(type, text);
  }

}
