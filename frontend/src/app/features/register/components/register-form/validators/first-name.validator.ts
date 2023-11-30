import {NameValidator} from "./name-validator";
import NameValidatorError = NameValidator.NameValidatorError;

export class FirstNameValidator {
  protected static readonly minLength: number = 3;
  protected static readonly maxLength: number = 20;

  public static message: Record<NameValidatorError, string> = {
    [NameValidatorError.Required]: `First name field cannot be empty.`,
    [NameValidatorError.MinLength]: `First name cannot contain less than ${this.minLength} characters.`,
    [NameValidatorError.MaxLength]: `First name cannot contain more than ${this.maxLength} characters.`,
    [NameValidatorError.Letters]: `The first name must consist exclusively of letters.`,
  };

  public static config: NameValidator.Config = {
    minLength: FirstNameValidator.minLength,
    maxLength: FirstNameValidator.maxLength,
    messages: FirstNameValidator.message
  };
}

