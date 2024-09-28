import {NameValidator} from "./name-validator";
import {NameValidatorError} from "./name-validator-error";

export class FirstNameValidator {
  protected static readonly minLength: number = 3;
  protected static readonly maxLength: number = 20;

  public static message: Record<NameValidatorError, string> = {
    [NameValidatorError.REQUIRED]: `First name field cannot be empty.`,
    [NameValidatorError.MIN_LENGTH]: `First name cannot contain less than ${this.minLength} characters.`,
    [NameValidatorError.MAX_LENGTH]: `First name cannot contain more than ${this.maxLength} characters.`,
    [NameValidatorError.LETTERS]: `The first name must consist exclusively of letters.`,
  };

  public static config: NameValidator.Config = {
    minLength: FirstNameValidator.minLength,
    maxLength: FirstNameValidator.maxLength,
    messages: FirstNameValidator.message
  };
}

