import {Constant} from "../../../../../shared/models/enums/constant";
import {Validate, ValidationMessage, ValidationResult} from "../../shared/validation/validation";

enum ValidationError {
  Regex,
}

export class PriceValidator implements Validate<string> {
  private regex: RegExp = /^([1-9]|\d{2,})(?:\.\d{1,2})?$/;
  private errorMessages: ValidationMessage = {
    [ValidationError.Regex]: "You entered invalid initial price. Initial price must be a numeric value greater than 1. " +
    "Decimals with a maximum scale of 2 are allowed."
  };

  public validate(value: string): ValidationResult {
    if (!this.regex.test(value)) {
      return {valid: false, message: this.errorMessages[ValidationError.Regex]};
    }

    return {valid: true, message: Constant.EmptyValue};
  }
}
