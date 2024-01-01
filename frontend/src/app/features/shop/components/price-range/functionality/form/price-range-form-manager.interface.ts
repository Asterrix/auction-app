import {PriceRangeForm} from "../../type/price-range.type";
import {PriceRangeFormGroup} from "./price-range-form-group.type";

export interface PriceRangeFormManager {
  readonly form: PriceRangeFormGroup;
  updateFormValues: (priceRange: PriceRangeForm) => Promise<void>;
  resetFormValues: () => Promise<void>;
}
