import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {
  isEmptyFn,
  isFieldValidFn,
  maxLengthFn,
  minLengthFn
} from "../../../../../shared/models/validators/validator-functions";

import {ValidationPair} from "./validation.pair";

export namespace EmailValidation {
  enum EmailValidatorError {
    Required,
    MinLength,
    MaxLength,
    Regex
  }

  const validationErrors = [
    EmailValidatorError.Required,
    EmailValidatorError.MinLength,
    EmailValidatorError.MaxLength,
    EmailValidatorError.Regex,
  ];

  export class EmailValidator {
    protected static minLength: number = 7;
    protected static maxLength: number = 40;

    public static MESSAGES: Record<EmailValidatorError, string> = {
      [EmailValidatorError.Required]: `Email field cannot be empty.`,
      [EmailValidatorError.MinLength]: `Email cannot contain less than ${EmailValidator.minLength} characters.`,
      [EmailValidatorError.MaxLength]: `Email cannot contain more than ${EmailValidator.maxLength} characters.`,
      [EmailValidatorError.Regex]: `Please enter a valid email address.`,
    };

    public static validator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors => {
        const email: string = control.value;

        const empty: boolean = isEmptyFn(email);
        if (empty) return {[EmailValidatorError.Required]: true};

        const minimumLength: boolean = minLengthFn(email, EmailValidator.minLength);
        if (minimumLength) return {[EmailValidatorError.MinLength]: true};

        const maximumLength: boolean = maxLengthFn(email, EmailValidator.maxLength);
        if (maximumLength) return {[EmailValidatorError.MaxLength]: true};

        const regexMatches: boolean = this.matchRegex(email);
        if (!regexMatches) return {[EmailValidatorError.Regex]: true};

        return {};
      };
    }

    public static validateEmailInForm(formGroup: FormGroup, fieldName: string): ValidationPair {
      for (const errorType of validationErrors) {
        if (isFieldValidFn(formGroup, fieldName, errorType.toString())) {
          return {valid: false, message: EmailValidator.MESSAGES[errorType]};
        }
      }

      return {valid: true};
    }

    private static matchRegex(email: string): boolean {
      /* RFC 5322 compliant regex */
      const emailRegex: RegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/;

      return emailRegex.test(email);
    }
  }
}
