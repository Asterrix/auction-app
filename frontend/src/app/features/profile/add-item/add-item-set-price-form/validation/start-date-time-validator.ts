import {differenceInHours, isSameDay} from "date-fns";
import {Constant} from "../../../../../shared/models/enums/constant";
import {isEmptyFn} from "../../../../../shared/models/validators/validator-functions";
import {ValidationMessage, ValidationResult} from "../../shared/validation/validation";
import {BaseDateTimeValidator} from "./base-date-time-validator";

enum ValidationError {
  EmptyStartTime,
  MinimumAllowedTimeSpan
}

export class StartDateTimeValidator extends BaseDateTimeValidator {
  protected errorMessages: ValidationMessage = {
    [ValidationError.EmptyStartTime]: "Enter the start date and time of the auction.",
    [ValidationError.MinimumAllowedTimeSpan]: `Minimum time span for auctioning is ${this.minimumTimeSpan} hours. Move your start time.`,
  };

  public validate(dateTime: string): ValidationResult {
    const date: Date = new Date(dateTime);

    if (isEmptyFn(dateTime)) {
      return {valid: false, message: this.errorMessages[ValidationError.EmptyStartTime]};
    }

    if (isSameDay(this.currentDate, date) && differenceInHours(date, this.currentDate) < this.minimumTimeSpan) {
      console.log(isSameDay(this.currentDate, date));
      console.log(differenceInHours(this.currentDate, date));
      return {valid: false, message: this.errorMessages[ValidationError.MinimumAllowedTimeSpan]};
    }

    return {valid: true, message: Constant.EmptyValue};
  }
}
