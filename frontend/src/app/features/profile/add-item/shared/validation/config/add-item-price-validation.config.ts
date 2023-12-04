import {FormGroup} from "@angular/forms";
import {PriceValidator} from "../../../add-item-set-price-form/validation/price-validator";
import {PriceDate} from "../../../add-item-set-price-form/add-item-price-form.service";
import {ValidationField} from "../validation";

export enum PriceValidation {
  Price
}

export class AddItemPriceValidationConfig {
  static initialiseValidationConfig(form: FormGroup<PriceDate>) {
    const validationConfig: Record<number, ValidationField<string>> = {
      [PriceValidation.Price]: {
        formControl: form.controls.price,
        validator: new PriceValidator()
      }
    };

    return validationConfig;
  }
}
