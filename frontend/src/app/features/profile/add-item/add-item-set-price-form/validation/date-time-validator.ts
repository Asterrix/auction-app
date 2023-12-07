import {differenceInDays, differenceInHours, isSameDay} from "date-fns";
import {Constant} from "../../../../../shared/models/enums/constant";
import {isEmptyFn} from "../../../../../shared/models/validators/validator-functions";
import {Validate, ValidationMessage, ValidationResult} from "../../shared/validation/validation";
import {DateTimeForm} from "../add-item-set-price-form.component";

enum ValidationError {
  EmptyStartTime,
  EmptyEndTime,
  OldDate,
  MinimumAllowedTimeSpan
}

export class DateTimeValidator implements Validate<string> {
  private readonly currentDate: Date = new Date();
  private readonly minimumTimeSpan: number = 3;
  private readonly dateTimeType: DateTimeForm;

  private errorMessages: ValidationMessage = {
    [ValidationError.EmptyStartTime]: "Enter the start date and time of the auction.",
    [ValidationError.EmptyEndTime]: "Enter the auction's end date and time.",
    [ValidationError.OldDate]: "Window to enter Date and Time has expired. Try again.",
    [ValidationError.MinimumAllowedTimeSpan]: `Minimum time span for auctioning is ${this.minimumTimeSpan} hours. Move your start time.`,
  };

  constructor(dateTimeType: DateTimeForm) {
    this.dateTimeType = dateTimeType;
  }

  public validate(dateTime: string): ValidationResult {
    const date: Date = new Date(dateTime);

    if (isEmptyFn(dateTime)) {
      return {
        valid: false,
        message: this.dateTimeType === DateTimeForm.StartTime
          ? this.errorMessages[ValidationError.EmptyStartTime]
          : this.errorMessages[ValidationError.EmptyEndTime]
      };
    }

    if (differenceInDays(this.currentDate, date) > 1) {
      return {valid: false, message: this.errorMessages[ValidationError.OldDate]};
    }

    if (isSameDay(this.currentDate, date) && differenceInHours(this.currentDate, date) < this.minimumTimeSpan) {
      return {valid: false, message: this.errorMessages[ValidationError.MinimumAllowedTimeSpan]};
    }

    return {valid: true, message: Constant.EmptyValue};
  }
}
