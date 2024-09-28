import {Constant} from "../../../../../shared/models/enums/constant";
import {AbstractValidationMessage} from "../../add-item-basic-form/validation/abstract-validation-message";
import {Validate, ValidationResult} from "../../shared/validation/formFieldValidator";

enum ValidationError {
  Regex,
}

export class PriceValidator extends AbstractValidationMessage implements Validate<string> {
  private regex: RegExp = /^(?:1\d*|\d{2,})(?:\.\d{1,2})?$/;
  protected errorMessages: Record<number, string> = {
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
