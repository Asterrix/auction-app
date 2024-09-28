import {Constant} from "../../../../../shared/models/enums/constant";
import {isEmptyFn} from "../../../../../shared/models/validators/validator-functions";
import {Validate, ValidationResult} from "../../shared/validation/formFieldValidator";
import {CategoryType} from "../form-categories/form-categories.component";
import {AbstractValidationMessage} from "./abstract-validation-message";

enum ValidationMessages {
  RequiredCategory,
  RequiredSubcategory
}

export class CategoryValidation extends AbstractValidationMessage implements Validate<string> {
  protected override errorMessages: Record<ValidationMessages, string> = {
    [ValidationMessages.RequiredCategory]: "Select a category.",
    [ValidationMessages.RequiredSubcategory]: "Select a subcategory."
  };
  private readonly categoryType: CategoryType;

  constructor(categoryType: CategoryType) {
    super();
    this.categoryType = categoryType;
  }

  public validate(category: string): ValidationResult {
    if (isEmptyFn(category)) {

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
