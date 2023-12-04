import {FormControl} from "@angular/forms";
import {Constant} from "../../../../../shared/models/enums/constant";

export type ValidationMessage = Record<number, string>;

export interface Validate<T> {
  validate(value: T): ValidationResult;
}

export type ValidationResult = {
  valid: boolean;
  message: string;
}

export type ValidationField<T> = {
  formControl: FormControl;
  validator: Validate<T>;
}

export type ValidationPair<T> = {
  formControl: FormControl;
  validator: Validate<T>;
  validationResult: ValidationResult;
}

interface IValidation<T> {
  validateField(field: number, value: T): void;

  validateAllFields(): boolean;

  validationStatus(field: number): ValidationResult;
}

export class Validation<T> implements IValidation<T> {
  private validationRecord: Record<number, ValidationPair<T>>;

  constructor(validationRecord: Record<number, ValidationField<T>>) {
    this.validationRecord = Object.entries(validationRecord).map(([, validator]) => {
      return {
        formControl: validator.formControl,
        validator: validator.validator,
        validationResult: {valid: true, message: Constant.EmptyValue},
      };
    });
  }

  public validateField(field: number, value: T): void {
    this.validationRecord[field].validationResult = this.validationRecord[field].validator.validate(value);
  }

  public validateAllFields(): boolean {
    let valid = true;

    for (const [field, validationPair] of Object.entries(this.validationRecord)) {
      const control = validationPair.formControl;

      this.validateField(Number(field), control.value);

      if (!validationPair.validationResult.valid) {
        valid = false;
      }

    }

    return valid;
  }

  public validationStatus(field: number): ValidationResult {
    if (this.validationRecord[field]) {
      return this.validationRecord[field].validationResult;
    }
    throw new Error("Form field could not be found.");
  }
}
