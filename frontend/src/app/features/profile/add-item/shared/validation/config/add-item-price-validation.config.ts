import {FormGroup} from "@angular/forms";
import {NameValidator} from "../../../../../register/components/register-form/validators/name-validator";
import {PriceDate} from "../../../add-item-set-price-form/add-item-price-form.service";
import {DateTimeForm} from "../../../add-item-set-price-form/add-item-set-price-form.component";
import {DateTimeValidator} from "../../../add-item-set-price-form/validation/date-time-validator";
import {FullDateTimeValidator} from "../../../add-item-set-price-form/validation/full-date-time-validator";
import {PriceValidator} from "../../../add-item-set-price-form/validation/price-validator";
import {Validation} from "../validation";

export enum PriceValidation {
  Price,
  StartDateTime,
  EndDateTime,
  FullDateTime
}

export class AddItemPriceValidationConfig {
  static initialise(form: FormGroup<PriceDate>) {
    return new Validation<string | [string, string]>({
      [PriceValidation.EndDateTime]: {
        formControl: form.controls.endTime,
        validator: new DateTimeValidator(DateTimeForm.EndTime)
      },
      [PriceValidation.Price]: {
        formControl: form.controls.price,
        validator: new PriceValidator()
      },
      [PriceValidation.StartDateTime]: {
        formControl: form.controls.startTime,
        validator: new DateTimeValidator(DateTimeForm.StartTime)
      },
      [PriceValidation.FullDateTime]: {
        formControl: form.controls.endTime,
        validator: new FullDateTimeValidator(form.controls.startTime, form.controls.endTime)
      }
    });
  }
}

