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

enum PasswordValidatorError {
  REQUIRED,
  MIN_LENGTH,
  MAX_LENGTH,
  SPECIAL_CHARACTER,
  LOWERCASE_LETTER,
  UPPERCASE_LETTER,
  NUMBER,
  WHITE_SPACE
}

export class PasswordValidator {
  protected static MIN_LENGTH: number = 8;
  protected static MAX_LENGTH: number = 100;

  public static MESSAGES: Record<PasswordValidatorError, string> = {
    [PasswordValidatorError.REQUIRED]: `Password field cannot be empty.`,
    [PasswordValidatorError.MIN_LENGTH]: `Password cannot contain less than ${PasswordValidator.MIN_LENGTH} characters.`,
    [PasswordValidatorError.MAX_LENGTH]: `Password cannot contain more than ${PasswordValidator.MAX_LENGTH} characters.`,
    [PasswordValidatorError.SPECIAL_CHARACTER]: `Password must contain at least one special character (!, $, @, etc...).`,
    [PasswordValidatorError.LOWERCASE_LETTER]: `Password must include at least one lowercase letter.`,
    [PasswordValidatorError.UPPERCASE_LETTER]: `Password must include at least one uppercase letter.`,
    [PasswordValidatorError.NUMBER]: `Password must contain at least one number.`,
    [PasswordValidatorError.WHITE_SPACE]: `Password cannot contain any white spaces.`,
  };

  public static validator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password: string = control.value;

      const empty: boolean = isEmptyFn(password);
      if (empty) return {[PasswordValidatorError.REQUIRED]: true};

      const minimumLength: boolean = minLengthFn(password, PasswordValidator.MIN_LENGTH);
      if (minimumLength) return {[PasswordValidatorError.MIN_LENGTH]: true};

      const maximumLength: boolean = maxLengthFn(password, PasswordValidator.MAX_LENGTH);
      if (maximumLength) return {[PasswordValidatorError.MAX_LENGTH]: true};

      const containsUppercaseCharacter: boolean = containsUppercaseCharacterFn(password);
      if (!containsUppercaseCharacter) return {[PasswordValidatorError.UPPERCASE_LETTER]: true};

      const containsLowercaseCharacter: boolean = containsLowercaseCharacterFn(password);
      if (!containsLowercaseCharacter) return {[PasswordValidatorError.LOWERCASE_LETTER]: true};

      const containsNumber: boolean = containsNumberFn(password);
      if (!containsNumber) return {[PasswordValidatorError.NUMBER]: true};

      const containsSpecialCharacter: boolean = containsSpecialCharacterFn(password);
      if (!containsSpecialCharacter) return {[PasswordValidatorError.SPECIAL_CHARACTER]: true};

      const containsWhiteSpaces: boolean = containsWhiteSpacesFn(password);
      if (containsWhiteSpaces) return {[PasswordValidatorError.WHITE_SPACE]: true};

      return null;
    };
  }

  public static validatePasswordInForm(formGroup: FormGroup, fieldName: string): ValidationPair {
    if (isFieldValidFn(formGroup, fieldName, PasswordValidatorError.REQUIRED.toString())) {
      return {valid: false, message: PasswordValidator.MESSAGES[PasswordValidatorError.REQUIRED]};
    }

    if (isFieldValidFn(formGroup, fieldName, PasswordValidatorError.MIN_LENGTH.toString())) {
      return {valid: false, message: PasswordValidator.MESSAGES[PasswordValidatorError.MIN_LENGTH]};
    }

    if (isFieldValidFn(formGroup, fieldName, PasswordValidatorError.MAX_LENGTH.toString())) {
      return {valid: false, message: PasswordValidator.MESSAGES[PasswordValidatorError.MAX_LENGTH]};
    }

    if (isFieldValidFn(formGroup, fieldName, PasswordValidatorError.UPPERCASE_LETTER.toString())) {
      return {valid: false, message: PasswordValidator.MESSAGES[PasswordValidatorError.UPPERCASE_LETTER]};
    }

    if (isFieldValidFn(formGroup, fieldName, PasswordValidatorError.LOWERCASE_LETTER.toString())) {
      return {valid: false, message: PasswordValidator.MESSAGES[PasswordValidatorError.LOWERCASE_LETTER]};
    }

    if (isFieldValidFn(formGroup, fieldName, PasswordValidatorError.NUMBER.toString())) {
      return {valid: false, message: PasswordValidator.MESSAGES[PasswordValidatorError.NUMBER]};
    }

    if (isFieldValidFn(formGroup, fieldName, PasswordValidatorError.SPECIAL_CHARACTER.toString())) {
      return {valid: false, message: PasswordValidator.MESSAGES[PasswordValidatorError.SPECIAL_CHARACTER]};
    }

    if (isFieldValidFn(formGroup, fieldName, PasswordValidatorError.WHITE_SPACE.toString())) {
      return {valid: false, message: PasswordValidator.MESSAGES[PasswordValidatorError.WHITE_SPACE]};
    }

    return {valid: true};
  }
}
