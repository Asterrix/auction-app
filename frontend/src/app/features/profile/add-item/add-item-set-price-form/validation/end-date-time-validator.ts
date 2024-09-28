import {differenceInDays} from "date-fns";
import {Constant} from "../../../../../shared/models/enums/constant";
import {isEmptyFn} from "../../../../../shared/models/validators/validator-functions";
import {ValidationMessage, ValidationResult} from "../../shared/validation/validation";
import {BaseDateTimeValidator} from "./base-date-time-validator";

enum ValidationError {
  EmptyEndTime,
  OldDate
}

export class EndDateTimeValidator extends BaseDateTimeValidator {
  protected errorMessages: ValidationMessage = {
    [ValidationError.EmptyEndTime]: "Enter the auction's end date and time.",
    [ValidationError.OldDate]: "Window to enter Date and Time has expired. Try again.",
  };

  public validate(dateTime: string): ValidationResult {
    const date: Date = new Date(dateTime);

    if (isEmptyFn(dateTime)) {
      return {
        valid: false,
        message: this.errorMessages[ValidationError.EmptyEndTime]
      };
    }

    if (differenceInDays(this.currentDate, date) > 1) {
      return {valid: false, message: this.errorMessages[ValidationError.OldDate]};
    }

    return {valid: true, message: Constant.EmptyValue};
  }
}
