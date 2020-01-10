import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

export class ValidatorExtension {

  static compareValidator(controlTarget: AbstractControl, message: string) {
    return (control: FormControl) => {
      if (!control.value) {
        return { required: true };
      } else if (control.value !== controlTarget.value) {
        return { compare: message, error: true };
      }
      return null;
    };
  }

  static setCompareValidator(myForm: FormGroup, control: string, controlTarget: string, message: string) {
    myForm.get(control).setValidators(this.compareValidator(myForm.controls[controlTarget], message));
  }
}
