import {Constant} from "../../../../../shared/models/enums/constant";
import {isEmptyFn, maxLengthFn, minLengthFn} from "../../../../../shared/models/validators/validator-functions";
import {Validate, ValidationMessage, ValidationResult} from "../../shared/validation/validation";

enum ValidationError {
  Required,
  MinLength,
  MaxLength
}

export class DescriptionValidation implements Validate<string> {
  private readonly minLength: number = 20;
  private readonly maxLength: number = 700;

  private errorMessages: ValidationMessage = {
    [ValidationError.Required]: "Enter item description.",
    [ValidationError.MinLength]: `Item description cannot be shorter than ${this.minLength} characters.`,
    [ValidationError.MaxLength]: `Item description cannot be longer than ${this.maxLength} characters.`
  };

  public validate(description: string): ValidationResult {
    if (isEmptyFn(description)) {
      return {valid: false, message: this.errorMessages[ValidationError.Required]};
    }

    if (minLengthFn(description, this.minLength)) {
      return {valid: false, message: this.errorMessages[ValidationError.MinLength]};
    }

    if (maxLengthFn(description, this.maxLength)) {
      return {valid: false, message: this.errorMessages[ValidationError.MaxLength]};
    }

    return {valid: true, message: Constant.EmptyValue};
  }
}
