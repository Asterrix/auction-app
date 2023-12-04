import {Constant} from "../../../../../shared/models/enums/constant";
import {isEmptyFn, maxLengthFn, minLengthFn} from "../../../../../shared/models/validators/validator-functions";
import {Validate, ValidationMessage, ValidationResult} from "../../shared/validation/validation";


enum ValidationError {
  Required,
  MinLength,
  MaxLength,
  Regex
}

export class ItemNameValidation implements Validate<string> {
  private readonly minLength: number = 3;
  private readonly maxLength: number = 50;
  private readonly regexPattern: RegExp = /^[a-zA-Z0-9.,"':;*]*$/;
  private errorMessages: ValidationMessage = {
    [ValidationError.Required]: "Item name is required.",
    [ValidationError.MinLength]: `Item name must cannot be shorter than ${this.minLength} characters.`,
    [ValidationError.MaxLength]: `Item name cannot be longer than ${this.maxLength} characters.`,
    [ValidationError.Regex]: "Item name cannot contain any special characters.",
  };

  validate(itemName: string): ValidationResult {
    if (isEmptyFn(itemName)) {
      return {valid: false, message: this.errorMessages[ValidationError.Required]};
    }

    if (minLengthFn(itemName, this.minLength)) {
      return {valid: false, message: this.errorMessages[ValidationError.MinLength]};
    }

    if (maxLengthFn(itemName, this.maxLength)) {
      return {valid: false, message: this.errorMessages[ValidationError.MaxLength]};
    }

    if (!this.regexPattern.test(itemName)) {
      return {valid: false, message: this.errorMessages[ValidationError.Regex]};
    }

    return {valid: true, message: Constant.EmptyValue};
  }
}
