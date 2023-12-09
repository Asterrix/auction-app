import {differenceInHours, isBefore, isSameDay} from "date-fns";
import {Constant} from "../../../../../shared/models/enums/constant";
import {isEmptyFn} from "../../../../../shared/models/validators/validator-functions";
import {ValidationMessage, ValidationResult} from "../../shared/validation/validation";
import {BaseDateTimeValidator} from "./base-date-time-validator";

enum ValidationError {
  EmptyStartTime,
  StartDateTimeIsBeforeCurrentDateTime,
}

export class StartDateTimeValidator extends BaseDateTimeValidator {
  protected errorMessages: ValidationMessage = {
    [ValidationError.EmptyStartTime]: "Enter the start date and time of the auction.",
    [ValidationError.StartDateTimeIsBeforeCurrentDateTime]: "Move your start time ahead of the current time.",
  };

  public validate(dateTime: string): ValidationResult {
    const date: Date = new Date(dateTime);

    if (isEmptyFn(dateTime)) {
      return {valid: false, message: this.errorMessages[ValidationError.EmptyStartTime]};
    }

    if(isBefore(date, this.currentDate)){
      return {valid: false, message: this.errorMessages[ValidationError.StartDateTimeIsBeforeCurrentDateTime]};
    }

    return {valid: true, message: Constant.EmptyValue};
  }
}
