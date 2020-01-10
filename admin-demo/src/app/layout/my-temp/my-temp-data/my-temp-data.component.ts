import { Component, OnInit } from '@angular/core';
import { BaseDataComponent } from 'src/app/_base/components/base-data-component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-temp-data',
  templateUrl: './my-temp-data.component.html',
  styleUrls: ['./my-temp-data.component.scss']
})
export class MyTempDataComponent extends BaseDataComponent implements OnInit {

  constructor(
    fb: FormBuilder,
  ) {
    super(fb);
  }

  ngOnInit() {
    this.createForm({
      name: [null, [Validators.required]],
      routePattern: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });
    if (this.id) {
      // TODO: Find One
      this.myForm.patchValue({});
    }
  }

  async submitForm() {
    super.submitForm();
    if (this.myForm.invalid) { return; }
    const body: any = this.myForm.value;
    this.isLoading = true;
    if (this.id) {
      body.id = this.id as number;
      // TODO: Edit Data
    } else {
      // TODO: Create Data
    }
    this.handleOk();
  }

}
