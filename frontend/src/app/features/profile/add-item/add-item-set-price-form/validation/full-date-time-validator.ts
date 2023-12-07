import {FormControl} from "@angular/forms";
import {isBefore} from "date-fns";
import {Constant} from "../../../../../shared/models/enums/constant";
import {Validate, ValidationMessage, ValidationResult} from "../../shared/validation/validation";

enum ValidationError {
  EndTimeIsEarlierThanStartTime
}

export class FullDateTimeValidator implements Validate<string> {
  private errorMessages: ValidationMessage = {
    [ValidationError.EndTimeIsEarlierThanStartTime]: `Change your end date to come after the start date.`
  };

  constructor(private startDateTimeControl: FormControl, private endDateTimeControl: FormControl) {
  }

  public validate(): ValidationResult {
    const startDate: Date = new Date(this.startDateTimeControl.value);
    const endDate: Date = new Date(this.endDateTimeControl.value);
    if (isBefore(endDate, startDate)) {
      return {valid: false, message: this.errorMessages[ValidationError.EndTimeIsEarlierThanStartTime]};
    }
    return {valid: true, message: Constant.EmptyValue};
  }
}
