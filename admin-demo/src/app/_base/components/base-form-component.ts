import { FormGroup, FormBuilder, AbstractControlOptions, FormArray, FormControl } from '@angular/forms';
declare let $;
export abstract class BaseFormComponent {
 
  myForm: FormGroup;
  isLoading = false;
  startLoading = () => this.isLoading = true;
  stopLoading = () => this.isLoading = false;
  constructor(
    protected fb: FormBuilder
  ) { }

  createForm(controlsConfig: { [key: string]: any; }, options?: AbstractControlOptions | { [key: string]: any; }) {
    this.myForm = this.fb.group(controlsConfig);
  }

  submitForm() {
    this.validateForm(this.myForm);
  }

  private validateForm(form: FormGroup) {
    for (const i in form.controls) {
      form.controls[i].markAsDirty();
      form.controls[i].updateValueAndValidity();
      if (form.controls[i] instanceof FormGroup) {
        this.validateForm(form.controls[i] as FormGroup);
      }
      if (form.controls[i] instanceof FormArray) {
        for (const item of (form.controls[i] as FormArray).controls) {
          if (item instanceof FormControl) {
            form.controls[i].markAsDirty();
            form.controls[i].updateValueAndValidity();
          } else if (item instanceof FormGroup) {
            this.validateForm(item as FormGroup);
          }
        }
      }
    }
  }

  public validateTab(myForm: FormGroup, isChild: boolean = false) {
    if (!isChild) {
      $('section').find('.navbar').find('.navbar-nav').find('.nav-item').find('a').removeClass('text-danger-300');
    }

    const listTab = $('section').find('.tab-content').find('.tab-pane');
    let tabFocus: any = null;
    for (const key in myForm.controls) {
      const control = myForm.controls[key];
      if (control.invalid) {
        // tslint:disable-next-line: max-line-length
        const name = control instanceof FormControl ? 'formcontrolname' : control instanceof FormGroup ? 'formgroupname' : 'formarrayname';
        if (name === 'formgroupname') {
          const tabChild = this.validateTab(control as FormGroup, true);
          if (tabFocus === null) {
            tabFocus = tabChild;
          }
        }
        if (name === 'formcontrolname' || name === "formarrayname") {
          const curentTab = $(`[${name}="${key}"]`).parents('.tab-pane');
          for (let i = 0; i < listTab.length; i++) {
            if (curentTab[0] === listTab[i]) {
              if (tabFocus === null) {
                tabFocus = i + 1;
              }
              $(`[${name}="${key}"]`).parents('section').find('.navbar').find('.navbar-nav').find('.nav-item').find('a').eq(i).addClass('text-danger-300');
            }
          }
        }
      }
    }
    return tabFocus;
  }
}
