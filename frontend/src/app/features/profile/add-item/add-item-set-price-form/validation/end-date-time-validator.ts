import {differenceInHours, isSameDay} from "date-fns";
import {Constant} from "../../../../../shared/models/enums/constant";
import {isEmptyFn} from "../../../../../shared/models/validators/validator-functions";
import {ValidationMessage, ValidationResult} from "../../shared/validation/validation";
import {BaseDateTimeValidator} from "./base-date-time-validator";

enum ValidationError {
  EmptyEndTime,
  MinimumAllowedTimeSpan
}

export class EndDateTimeValidator extends BaseDateTimeValidator {
  protected errorMessages: ValidationMessage = {
    [ValidationError.EmptyEndTime]: "Enter the auction's end date and time.",
    [ValidationError.MinimumAllowedTimeSpan]: `Minimum time span for auctioning is ${this.minimumTimeSpan} hours. Move your end date.`,
  };

  public validate(dateTime: string): ValidationResult {
    const date: Date = new Date(dateTime);

    if (isEmptyFn(dateTime)) {
      return {
        valid: false,
        message: this.errorMessages[ValidationError.EmptyEndTime]
      };
    }

    if (isSameDay(this.currentDate, date) && differenceInHours(date, this.currentDate) < this.minimumTimeSpan) {
      return {valid: false, message: this.errorMessages[ValidationError.MinimumAllowedTimeSpan]};
    }

    return {valid: true, message: Constant.EmptyValue};
  }
}
