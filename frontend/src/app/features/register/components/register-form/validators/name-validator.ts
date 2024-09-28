import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {
  isEmptyFn,
  isFieldValidFn,
  isMadeUpOfLettersFn,
  maxLengthFn,
  minLengthFn
} from "../../../../../shared/models/validators/validator-functions";
import {RegisterForm} from "../register-form.component";
import {ValidationPair} from "./validation.pair";

export namespace NameValidator {
  export enum NameValidatorError {
    Required,
    MinLength,
    MaxLength,
    Letters
  }

  export interface Config {
    minLength: number;
    maxLength: number;
    messages: Record<NameValidatorError, string>;
  }

  const validationErrors = [
    NameValidatorError.Required,
    NameValidatorError.MinLength,
    NameValidatorError.MaxLength,
    NameValidatorError.Letters,
  ];

  export function validator(config: Config): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const name: string = control.value;

      const empty: boolean = isEmptyFn(name);
      if (empty) return {[NameValidatorError.Required]: true};

      const minimumLength: boolean = minLengthFn(name, config.minLength);
      if (minimumLength) return {[NameValidatorError.MinLength]: true};

      const maximumLength: boolean = maxLengthFn(name, config.maxLength);
      if (maximumLength) return {[NameValidatorError.MaxLength]: true};

      const containsSpecialCharacters: boolean = isMadeUpOfLettersFn(name);
      if (containsSpecialCharacters) return {[NameValidatorError.Letters]: true};

      return {};
    };
  }

  export function validateName(formGroup: FormGroup, fieldName: RegisterForm, config: Config): ValidationPair {
    for (const errorType of validationErrors) {
      if (isFieldValidFn(formGroup, fieldName, errorType.toString())) {
        return {valid: false, message: config.messages[errorType]};
      }
    }

    return {valid: true};
  }
}
