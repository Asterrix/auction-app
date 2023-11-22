import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {
  isEmptyFn,
  isFieldValidFn,
  isMadeUpOfLettersFn,
  maxLengthFn,
  minLengthFn
} from "../../../../../shared/models/validators/validator-functions";
import {RegisterForm} from "../register-form.component";
import {NameValidatorError} from "./name-validator-error";
import {ValidationPair} from "./validation.pair";

export namespace NameValidator {
  export interface Config {
    minLength: number;
    maxLength: number;
    messages: Record<NameValidatorError, string>;
  }

  export function validator(config: Config): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const name: string = control.value;

      const empty: boolean = isEmptyFn(name);
      if (empty) return {[NameValidatorError.REQUIRED]: true};

      const minimumLength: boolean = minLengthFn(name, config.minLength);
      if (minimumLength) return {[NameValidatorError.MIN_LENGTH]: true};

      const maximumLength: boolean = maxLengthFn(name, config.maxLength);
      if (maximumLength) return {[NameValidatorError.MAX_LENGTH]: true};

      const containsSpecialCharacters: boolean = isMadeUpOfLettersFn(name);
      if (containsSpecialCharacters) return {[NameValidatorError.LETTERS]: true};

      return null;
    };
  }

  export function validateName(formGroup: FormGroup, fieldName: RegisterForm, config: Config): ValidationPair {
    if (isFieldValidFn(formGroup, fieldName, NameValidatorError.REQUIRED.toString())) {
      return {valid: false, message: config.messages[NameValidatorError.REQUIRED]};
    }

    if (isFieldValidFn(formGroup, fieldName, NameValidatorError.MIN_LENGTH.toString())) {
      return {valid: false, message: config.messages[NameValidatorError.MIN_LENGTH]};
    }

    if (isFieldValidFn(formGroup, fieldName, NameValidatorError.MAX_LENGTH.toString())) {
      return {valid: false, message: config.messages[NameValidatorError.MAX_LENGTH]};
    }

    if (isFieldValidFn(formGroup, fieldName, NameValidatorError.LETTERS.toString())) {
      return {valid: false, message: config.messages[NameValidatorError.LETTERS]};
    }

    return {valid: true};
  }
}
