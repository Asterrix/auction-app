import {Constant} from "../../../../../shared/models/enums/constant";
import {isEmptyFn, maxLengthFn, minLengthFn} from "../../../../../shared/models/validators/validator-functions";
import {Validate, ValidationResult} from "../../shared/validation/formFieldValidator";
import {AbstractValidationMessage} from "./abstract-validation-message";

enum ValidationError {
  Required,
  MinLength,
  MaxLength
}

export class DescriptionValidation extends AbstractValidationMessage implements Validate<string> {
  private readonly minLength: number = 20;
  private readonly maxLength: number = 700;

  protected override errorMessages: Record<ValidationError, string> = {
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
