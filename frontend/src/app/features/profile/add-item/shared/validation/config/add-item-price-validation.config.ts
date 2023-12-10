import {FormGroup} from "@angular/forms";
import {PriceDateTime} from "../../../add-item-set-price-form/services/add-item-price-form.service";
import {EndDateTimeValidator} from "../../../add-item-set-price-form/validation/end-date-time-validator";
import {FullDateTimeValidator} from "../../../add-item-set-price-form/validation/full-date-time-validator";
import {PriceValidator} from "../../../add-item-set-price-form/validation/price-validator";
import {StartDateTimeValidator} from "../../../add-item-set-price-form/validation/start-date-time-validator";
import {Validation} from "../validation";

export enum PriceValidation {
  Price,
  StartDateTime,
  EndDateTime,
  FullDateTime
}

export class AddItemPriceValidationConfig {
  static initialise(form: FormGroup<PriceDateTime>) {
    return new Validation<string | [string, string]>({
      [PriceValidation.Price]: {
        formControl: form.controls.price,
        validator: new PriceValidator()
      },
      [PriceValidation.StartDateTime]: {
        formControl: form.controls.startTime,
        validator: new StartDateTimeValidator()
      },
      [PriceValidation.EndDateTime]: {
        formControl: form.controls.endTime,
        validator: new EndDateTimeValidator()
      },
      [PriceValidation.FullDateTime]: {
        formControl: form.controls.endTime,
        validator: new FullDateTimeValidator(form.controls.startTime, form.controls.endTime)
      }
    });
  }
}

