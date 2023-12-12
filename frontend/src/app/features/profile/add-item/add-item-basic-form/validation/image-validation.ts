import {Constant} from "../../../../../shared/models/enums/constant";
import {Validate, ValidationMessage, ValidationResult} from "../../shared/validation/validation";

enum ValidationError {
  MinNumberOfImages,
  MaxNumberOfImages
}

export class ImageValidation implements Validate<string[]> {
  private readonly minNumber: number = 3;
  private readonly maxNumber: number = 30;

  private errorMessages: ValidationMessage = {
    [ValidationError.MinNumberOfImages]: `You must upload at least ${this.minNumber} photos of an item.`,
    [ValidationError.MaxNumberOfImages]: `You cannot upload more than ${this.maxNumber} photos of an item.`
  };

  public validate(imageList: string[]): ValidationResult {
    if (imageList.length < this.minNumber) {
      return {valid: false, message: this.errorMessages[ValidationError.MinNumberOfImages]};
    }

    if (imageList.length > this.maxNumber) {
      return {valid: false, message: this.errorMessages[ValidationError.MaxNumberOfImages]};
    }

    return {valid: true, message: Constant.EmptyValue};
  }
}
