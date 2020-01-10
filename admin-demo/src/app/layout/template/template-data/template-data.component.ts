import { Component, OnInit } from '@angular/core';
import { BaseDataComponent } from 'src/app/_base/components/base-data-component';
import { FormBuilder } from '@angular/forms';
import { ExtensionService } from 'src/app/_base/services/extension.service';
import { GlobalValidate } from 'src/app/_base/class/global-validate';
import { TemplateService } from 'src/app/_shared/services/template.service';

@Component({
  selector: 'app-template-data',
  templateUrl: './template-data.component.html',
  styleUrls: ['./template-data.component.scss']
})
export class TemplateDataComponent extends BaseDataComponent implements OnInit {
  constructor(
    fb: FormBuilder,
    private ex: ExtensionService,
    private sv: TemplateService
  ) {
    super(fb);
  }

  async ngOnInit() {
    this.createForm({
      data: this.fb.group({
        name: ['', [GlobalValidate.required({ error: 'Không được để trống' })]],
        avata: [''],
        files: ['']
      }),
      dataDb: this.fb.group({
        status: [1]
      })
    });
    if (this.id) {
      const rs = await this.sv.findOneById(this.id);
      this.ex.logDebug('Edit item', rs);
      if (rs.ok) {
        this.myForm.patchValue(rs.result);
      }
    }
  }

  async submitForm() {
    super.submitForm();
    const body: any = this.myForm.value;
    if (this.myForm.invalid) { return; }

    this.isLoading = true;
    let result: any;
    if (this.id) {
      const rs = await this.sv.edit(this.id as number, body);
      this.isLoading = false;
      if (rs.ok) {
        result = rs.result;
      } else {
        // this.bindError(this.myForm, rs);
      }
    } else {
      const rs = await this.sv.add(body);
      this.isLoading = false;
      if (rs.ok) {
        result = rs.result;
      } else {
        // this.bindError(this.myForm, rs);
      }
    }
    this.handleOk(result);
  }

}

