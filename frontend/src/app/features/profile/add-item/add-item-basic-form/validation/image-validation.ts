import {Constant} from "../../../../../shared/models/enums/constant";
import {Validate, ValidationResult} from "../../shared/validation/formFieldValidator";
import {AbstractValidationMessage} from "./abstract-validation-message";

enum ValidationError {
  MinNumberOfImages,
  MaxNumberOfImages
}

export class ImageValidation extends AbstractValidationMessage implements Validate<string[]> {
  private readonly minLength: number = 3;
  private readonly maxLength: number = 20;

  protected override errorMessages: Record<ValidationError, string> = {
    [ValidationError.MinNumberOfImages]: `You must upload at least ${this.minLength} photos of an item.`,
    [ValidationError.MaxNumberOfImages]: `You cannot upload more than ${this.maxLength} photos of an item.`
  };

  public validate(imageList: string[]): ValidationResult {
    if (imageList.length < this.minLength) {
      return {valid: false, message: this.errorMessages[ValidationError.MinNumberOfImages]};
    }

    if (imageList.length > this.maxLength) {
      return {valid: false, message: this.errorMessages[ValidationError.MaxNumberOfImages]};
    }

    return {valid: true, message: Constant.EmptyValue};
  }
}
