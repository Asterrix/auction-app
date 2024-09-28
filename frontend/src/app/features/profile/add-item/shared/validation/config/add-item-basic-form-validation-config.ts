import {FormGroup} from "@angular/forms";
import {Basic} from "../../../add-item-basic-form/services/add-item-basic-form.service";
import {CategoryType} from "../../../add-item-basic-form/form-categories/form-categories.component";
import {CategoryValidation} from "../../../add-item-basic-form/validation/category-validation";
import {DescriptionValidation} from "../../../add-item-basic-form/validation/description-validation";
import {ImageValidation} from "../../../add-item-basic-form/validation/image-validation";
import {ItemNameValidation} from "../../../add-item-basic-form/validation/item-name.validation";
import {ValidationField} from "../validation";

export enum BasicFormValidation {
  ItemName,
  Category,
  Subcategory,
  Description,
  Photos,
}

export class AddItemBasicFormValidationConfig {
  static initialiseValidationConfig(form: FormGroup<Basic>) {
    const validationConfig: Record<number, ValidationField<string | number | string[]>> = {
      [BasicFormValidation.ItemName]: {
        formControl: form.controls.itemName,
        validator: new ItemNameValidation()
      },
      [BasicFormValidation.Category]: {
        formControl: form.controls.category,
        validator: new CategoryValidation(CategoryType.Category)
      },
      [BasicFormValidation.Subcategory]: {
        formControl: form.controls.subcategory,
        validator: new CategoryValidation(CategoryType.Subcategory)
      },
      [BasicFormValidation.Description]: {
        formControl: form.controls.description,
        validator: new DescriptionValidation()
      },
      [BasicFormValidation.Photos]: {
        formControl: form.controls.images,
        validator: new ImageValidation()
      },
    };

    return validationConfig;
  }
}
