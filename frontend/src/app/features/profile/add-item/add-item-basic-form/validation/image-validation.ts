import {Constant} from "../../../../../shared/models/enums/constant";
import {Validate, ValidationMessage, ValidationResult} from "../../shared/validation/validation";

enum ValidationError {
  MinNumberOfImages,
  MaxNumberOfImages
}

export class ImageValidation implements Validate<string[]> {
  private readonly minLength: number = 3;
  private readonly maxLength: number = 30;

  private errorMessages: ValidationMessage = {
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
