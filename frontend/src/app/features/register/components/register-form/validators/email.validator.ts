import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {
  isEmptyFn,
  isFieldValidFn,
  maxLengthFn,
  minLengthFn
} from "../../../../../shared/models/validators/validator-functions";

import {ValidationPair} from "./validation.pair";

enum EmailValidatorError {
  REQUIRED,
  MIN_LENGTH,
  MAX_LENGTH,
  REGEX
}

export class EmailValidator {
  protected static MIN_LENGTH: number = 7;
  protected static MAX_LENGTH: number = 40;

  public static MESSAGES: Record<EmailValidatorError, string> = {
    [EmailValidatorError.REQUIRED]: `Email field cannot be empty.`,
    [EmailValidatorError.MIN_LENGTH]: `Email cannot contain less than ${EmailValidator.MIN_LENGTH} characters.`,
    [EmailValidatorError.MAX_LENGTH]: `Email cannot contain more than ${EmailValidator.MAX_LENGTH} characters.`,
    [EmailValidatorError.REGEX]: `Please enter a valid email address.`,
  };

  public static validator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const email: string = control.value;

      const empty: boolean = isEmptyFn(email);
      if (empty) return {[EmailValidatorError.REQUIRED]: true};

      const minimumLength: boolean = minLengthFn(email, EmailValidator.MIN_LENGTH);
      if (minimumLength) return {[EmailValidatorError.MIN_LENGTH]: true};

      const maximumLength: boolean = maxLengthFn(email, EmailValidator.MAX_LENGTH);
      if (maximumLength) return {[EmailValidatorError.MAX_LENGTH]: true};

      const regexMatches: boolean = this.matchRegex(email);
      if (!regexMatches) return {[EmailValidatorError.REGEX]: true};

      return null;
    };
  }

  public static validateEmailInForm(formGroup: FormGroup, fieldName: string): ValidationPair {
    if (isFieldValidFn(formGroup, fieldName, EmailValidatorError.REQUIRED.toString())) {
      return {valid: false, message: EmailValidator.MESSAGES[EmailValidatorError.REQUIRED]};
    }

    if (isFieldValidFn(formGroup, fieldName, EmailValidatorError.MIN_LENGTH.toString())) {
      return {valid: false, message: EmailValidator.MESSAGES[EmailValidatorError.MIN_LENGTH]};
    }

    if (isFieldValidFn(formGroup, fieldName, EmailValidatorError.MAX_LENGTH.toString())) {
      return {valid: false, message: EmailValidator.MESSAGES[EmailValidatorError.MAX_LENGTH]};
    }

    if (isFieldValidFn(formGroup, fieldName, EmailValidatorError.REGEX.toString())) {
      return {valid: false, message: EmailValidator.MESSAGES[EmailValidatorError.REGEX]};
    }

    return {valid: true};
  }

  private static matchRegex(email: string): boolean {
    /* RFC 5322 compliant regex */
    const emailRegex: RegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/;

    return emailRegex.test(email);
  }
}
