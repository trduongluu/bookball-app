import { FormGroup, FormControl } from '@angular/forms';
export class GlobalValidate {
    static mailFormat(result: any = { format: true }) {
        return (control: FormGroup) => {
            var EMAIL_REGEXP = /^[a-zA-Z0-9.+_]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i;

            if (control.value !== null && control.value !== "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
                return result;
            }
            return null;
        }
    }

    static required(result: any = { required: true }) {
        return (control: FormGroup) => {
            if (control.value === null || control.value === undefined || control.value === "") {
                return result;
            }
            return null;
        }
    }

    static imgRequired(result: any = { required: true }) {
        return (control: FormGroup) => {
            if (control.value === null || control.value === undefined || control.value === "") {
                return result;
            }
            let count = 0;
            control.value.forEach(x => {
                if (x.url !== '') {
                    count++;
                }
            });
            if (count === 0) {
                return result;
            }
            return null;
        }
    }

    static phone(result: any = { phone: true }) {
        return (control: FormGroup) => {
            var TEL_REGEXP = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/im;

            if (control.value !== null && control.value !== "" && !TEL_REGEXP.test(control.value)) {
                return result;
            }
            return null;
        }
    }

    static number(result: any = { number: true }) {
        return (control: FormGroup) => {
            var TEL_REGEXP = /^\d+$/;

            if (control.value !== null && control.value !== "" && !TEL_REGEXP.test(control.value)) {
                return result;
            }
            return null;
        }
    }
    static regularExpression(pattern: string = '', result: any = { fomat: true }) {
        return (control: FormGroup) => {
            var Pattern_REGEXP = new RegExp(pattern, 'g');
            if (control.value !== null && control.value !== "" && (Pattern_REGEXP.test(control.value))) {
                return result;
            }
            return null;
        }
    }

    static emailOrPhone(result: any = { fomat: true }) {
        return (control: FormGroup) => {
            var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
            var TEL_REGEXP = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/im;

            if (control.value !== null && control.value !== "" && !TEL_REGEXP.test(control.value) && !EMAIL_REGEXP.test(control.value)) {
                return result;
            }
            return null;
        }
    }
    static matchOtherValidator(controlMap: string, result: any = { match: true }) {
        return (control: FormGroup) => {
            if (control.value) {
                let otherControl: FormControl;
                // Initializing the validator.
                otherControl = control.parent.get(controlMap) as FormControl;
                if (!otherControl) {
                    throw new Error('matchOtherValidator(): other control is not found in parent group');
                }
                otherControl.valueChanges.subscribe(() => {
                    control.updateValueAndValidity();
                });
                if (otherControl.value !== control.value) {
                    return result;
                }
            }
            return null;

        }
    }

    static MinLength(min: number, result: any = { min: true }) {
        return (control: FormGroup) => {
            if (control.value && control.value.length < min) {
                return result;
            }
            return null;

        }
    }

    static MaxLength(max: number, result: any = { max: true }) {
        return (control: FormGroup) => {
            if (control.value && control.value.length > max) {
                return result;
            }
            return null;

        }
    }

    static MinLengthNumber(min: number, result: any = { min: true }) {
        return (control: FormGroup) => {
            if (control.value && parseInt(control.value) < min) {
                return result;
            }
            return null;

        }
    }

    static MaxLengthNumber(max: number, result: any = { max: true }) {
        return (control: FormGroup) => {
            if (control.value && parseInt(control.value) > max) {
                return result;
            }
            return null;

        }
    }
}
