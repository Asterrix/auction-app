import {FormControl} from "@angular/forms";

export type ValidationResult = {
  valid: boolean;
  message: string;
}

export interface Validate<T> {
  validate(value: T): ValidationResult;
}

interface FormValidation<T> {
  validateFormField(control: FormControl, value: T): void;
}

export type FormPairs<T> = {
  formControl: FormControl,
  validator: Validate<T>;
}

export class FormFieldValidator<T> implements FormValidation<T> {
  private validators: FormPairs<T>[];
  private validationStatus: ValidationResult[];

  constructor(validators: FormPairs<T>[]) {
    this.validators = validators;
    this.validationStatus = new Array(validators.length).fill({valid: true, message: ""});
  }

  public getStatus(control: FormControl): ValidationResult {
    const index = this.validators.findIndex(item => item.formControl === control);
    if (index !== -1) {
      return this.validationStatus[index];
    }
    throw new Error("Form control could not be found.");
  }

  public validateFormField(control: FormControl, value: T): void {
    if (control.dirty || control.touched) {
      const index = this.validators.findIndex(item => item.formControl === control);
      if (index !== -1) {
        this.validationStatus[index] = this.validators[index].validator.validate(value);
      }
    }
  }

  public validateAllFormFields(): void {
    this.validators.forEach(({ formControl, validator }, index) => {
      const value = formControl.value;
      this.validationStatus[index] = validator.validate(value);
    });
  }
}
