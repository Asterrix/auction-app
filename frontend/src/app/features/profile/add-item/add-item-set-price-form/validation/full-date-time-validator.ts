import {FormControl} from "@angular/forms";
import {differenceInHours, isBefore, isEqual} from "date-fns";
import {Constant} from "../../../../../shared/models/enums/constant";
import {ValidationMessage, ValidationResult} from "../../shared/validation/validation";
import {BaseDateTimeValidator} from "./base-date-time-validator";

enum ValidationError {
  EndTimeIsEarlierThanStartTime,
  MinimumAllowedTimeSpan
}

export class FullDateTimeValidator extends BaseDateTimeValidator {
  protected errorMessages: ValidationMessage = {
    [ValidationError.EndTimeIsEarlierThanStartTime]: `Change your end date to come after the start date.`,
    [ValidationError.MinimumAllowedTimeSpan]: `Minimum time span for auctioning is ${this.minimumTimeSpan} hours. Adjust your time.`,
  };

  constructor(private startDateTimeControl: FormControl, private endDateTimeControl: FormControl) {
    super();
  }

  public validate(): ValidationResult {
    const startDate: Date = new Date(this.startDateTimeControl.value);
    const endDate: Date = new Date(this.endDateTimeControl.value);

    if (isBefore(endDate, startDate)) {
      return {valid: false, message: this.errorMessages[ValidationError.EndTimeIsEarlierThanStartTime]};
    }

    if (isEqual(startDate, endDate) || differenceInHours(endDate, startDate) < this.minimumTimeSpan) {
      return {valid: false, message: this.errorMessages[ValidationError.MinimumAllowedTimeSpan]};
    }

    return {valid: true, message: Constant.EmptyValue};
  }
}
