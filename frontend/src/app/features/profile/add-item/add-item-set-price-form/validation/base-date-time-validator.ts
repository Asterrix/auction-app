import {Validate, ValidationMessage, ValidationResult} from "../../shared/validation/validation";

export abstract class BaseDateTimeValidator implements Validate<string> {
  protected abstract errorMessages: ValidationMessage;

  constructor(protected currentDate: Date = new Date(),
    protected minimumTimeSpan: number = 3
  ) {
  }

  public abstract validate(dateTime: string): ValidationResult;
}
