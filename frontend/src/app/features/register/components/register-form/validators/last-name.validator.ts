import {NameValidator} from "./name-validator";
import NameValidatorError = NameValidator.NameValidatorError;

export class LastNameValidator {
  protected static readonly minLength: number = 3;
  protected static readonly maxLength: number = 30;

  public static message: Record<NameValidatorError, string> = {
    [NameValidatorError.Required]: `Last name field cannot be empty.`,
    [NameValidatorError.MinLength]: `Last name cannot contain less than ${this.minLength} characters.`,
    [NameValidatorError.MaxLength]: `Last name cannot contain more than ${this.maxLength} characters.`,
    [NameValidatorError.Letters]: `The last name must consist exclusively of letters.`,
  };

  public static config: NameValidator.Config = {
    minLength: LastNameValidator.minLength,
    maxLength: LastNameValidator.maxLength,
    messages: LastNameValidator.message
  };
}

