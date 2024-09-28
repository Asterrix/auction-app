import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {
  isEmptyFn,
  isFieldValidFn,
  isMadeUpOfLettersFn,
  maxLengthFn,
  minLengthFn
} from "../../../../../shared/models/validators/validator-functions";
import {ValidationPair} from "../register-form.component";
import {NameValidatorError} from "./name-validator-error";

export class FirstNameValidator {
  protected static MIN_LENGTH: number = 3;
  protected static MAX_LENGTH: number = 20;

  public static MESSAGES: Record<NameValidatorError, string> = {
    [NameValidatorError.REQUIRED]: `First name field cannot be empty.`,
    [NameValidatorError.MIN_LENGTH]: `First name cannot contain less than ${FirstNameValidator.MIN_LENGTH} characters.`,
    [NameValidatorError.MAX_LENGTH]: `First name cannot contain more than ${FirstNameValidator.MAX_LENGTH} characters.`,
    [NameValidatorError.LETTERS]: `The first name must consist exclusively of letters.`,
  };

  public static validator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const name: string = control.value;

      const empty: boolean = isEmptyFn(name);
      if (empty) return {[NameValidatorError.REQUIRED]: true};

      const minimumLength: boolean = minLengthFn(name, FirstNameValidator.MIN_LENGTH);
      if (minimumLength) return {[NameValidatorError.MIN_LENGTH]: true};

      const maximumLength: boolean = maxLengthFn(name, FirstNameValidator.MAX_LENGTH);
      if (maximumLength) return {[NameValidatorError.MAX_LENGTH]: true};

      const containsSpecialCharacters: boolean = isMadeUpOfLettersFn(name);
      if (containsSpecialCharacters) return {[NameValidatorError.LETTERS]: true};

      return null;
    };
  }

  public static validateFirstNameInForm(formGroup: FormGroup, fieldName: string): ValidationPair {
    if (isFieldValidFn(formGroup, fieldName, NameValidatorError.REQUIRED.toString())) {
      return {valid: false, message: FirstNameValidator.MESSAGES[NameValidatorError.REQUIRED]};
    }

    if (isFieldValidFn(formGroup, fieldName, NameValidatorError.MIN_LENGTH.toString())) {
      return {valid: false, message: FirstNameValidator.MESSAGES[NameValidatorError.MIN_LENGTH]};
    }

    if (isFieldValidFn(formGroup, fieldName, NameValidatorError.MAX_LENGTH.toString())) {
      return {valid: false, message: FirstNameValidator.MESSAGES[NameValidatorError.MAX_LENGTH]};
    }

    if (isFieldValidFn(formGroup, fieldName, NameValidatorError.LETTERS.toString())) {
      return {valid: false, message: FirstNameValidator.MESSAGES[NameValidatorError.LETTERS]};
    }

    return {valid: true};
  }
}

