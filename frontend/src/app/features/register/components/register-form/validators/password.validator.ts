import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {
  containsLowercaseCharacterFn,
  containsNumberFn,
  containsSpecialCharacterFn,
  containsUppercaseCharacterFn,
  containsWhiteSpacesFn,
  isEmptyFn,
  isFieldValidFn,
  maxLengthFn,
  minLengthFn
} from "../../../../../shared/models/validators/validator-functions";

import {ValidationPair} from "./validation.pair";

export namespace PasswordValidation {
  enum PasswordValidatorError {
    Required,
    MinLength,
    MaxLength,
    SpecialCharacter,
    LowercaseLetter,
    UppercaseLetter,
    Number,
    Whitespace
  }

  const validationErrors = [
    PasswordValidatorError.Required,
    PasswordValidatorError.MinLength,
    PasswordValidatorError.MaxLength,
    PasswordValidatorError.SpecialCharacter,
    PasswordValidatorError.LowercaseLetter,
    PasswordValidatorError.UppercaseLetter,
    PasswordValidatorError.Number,
    PasswordValidatorError.Whitespace,
  ];

  export class PasswordValidator {
    protected static minLength: number = 8;
    protected static maxLength: number = 100;

    public static messages: Record<PasswordValidatorError, string> = {
      [PasswordValidatorError.Required]: `Password field cannot be empty.`,
      [PasswordValidatorError.MinLength]: `Password cannot contain less than ${PasswordValidator.minLength} characters.`,
      [PasswordValidatorError.MaxLength]: `Password cannot contain more than ${PasswordValidator.maxLength} characters.`,
      [PasswordValidatorError.SpecialCharacter]: `Password must contain at least one special character (!, $, @, etc...).`,
      [PasswordValidatorError.LowercaseLetter]: `Password must include at least one lowercase letter.`,
      [PasswordValidatorError.UppercaseLetter]: `Password must include at least one uppercase letter.`,
      [PasswordValidatorError.Number]: `Password must contain at least one number.`,
      [PasswordValidatorError.Whitespace]: `Password cannot contain any white spaces.`,
    };

    public static validator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const password: string = control.value;

        const empty: boolean = isEmptyFn(password);
        if (empty) return {[PasswordValidatorError.Required]: true};

        const minimumLength: boolean = minLengthFn(password, PasswordValidator.minLength);
        if (minimumLength) return {[PasswordValidatorError.MinLength]: true};

        const maximumLength: boolean = maxLengthFn(password, PasswordValidator.maxLength);
        if (maximumLength) return {[PasswordValidatorError.MaxLength]: true};

        const containsUppercaseCharacter: boolean = containsUppercaseCharacterFn(password);
        if (!containsUppercaseCharacter) return {[PasswordValidatorError.UppercaseLetter]: true};

        const containsLowercaseCharacter: boolean = containsLowercaseCharacterFn(password);
        if (!containsLowercaseCharacter) return {[PasswordValidatorError.LowercaseLetter]: true};

        const containsNumber: boolean = containsNumberFn(password);
        if (!containsNumber) return {[PasswordValidatorError.Number]: true};

        const containsSpecialCharacter: boolean = containsSpecialCharacterFn(password);
        if (!containsSpecialCharacter) return {[PasswordValidatorError.SpecialCharacter]: true};

        const containsWhiteSpaces: boolean = containsWhiteSpacesFn(password);
        if (containsWhiteSpaces) return {[PasswordValidatorError.Whitespace]: true};

        return {};
      };
    }

    public static validatePasswordInForm(formGroup: FormGroup, fieldName: string): ValidationPair {
      for (const errorType of validationErrors) {
        if (isFieldValidFn(formGroup, fieldName, errorType.toString())) {
          return {valid: false, message: PasswordValidator.messages[errorType]};
        }
      }

      return {valid: true};
    }
  }
}
