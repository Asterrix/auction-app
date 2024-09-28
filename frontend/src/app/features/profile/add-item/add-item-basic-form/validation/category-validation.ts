import {Constant} from "../../../../../shared/models/enums/constant";
import {Validate, ValidationMessage, ValidationResult} from "../../shared/validation/validation";
import {CategoryType} from "../form-categories/form-categories.component";

enum ValidationMessages {
  RequiredCategory,
  RequiredSubcategory
}

export class CategoryValidation implements Validate<number> {
  private errorMessages: ValidationMessage = {
    [ValidationMessages.RequiredCategory]: "Select a category.",
    [ValidationMessages.RequiredSubcategory]: "Select a subcategory."
  };
  private readonly categoryType: CategoryType;

  constructor(categoryType: CategoryType) {
    this.categoryType = categoryType;
  }

  public validate(category: number): ValidationResult {
    if (category < 1) {

      if (this.categoryType === CategoryType.Category) {
        return {valid: false, message: this.errorMessages[ValidationMessages.RequiredCategory]};
      }

      if (this.categoryType === CategoryType.Subcategory) {
        return {valid: false, message: this.errorMessages[ValidationMessages.RequiredSubcategory]};
      }
    }

    return {valid: true, message: Constant.EmptyValue};
  }
}
