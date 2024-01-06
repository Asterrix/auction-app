import {PriceFilter} from "../filter/price-filter.type";
import {PriceRangeFormGroup} from "./price-filter-form-group.type";

export interface PriceFilterForm {
  readonly form: PriceRangeFormGroup;
  updateFormValues: (priceRange: PriceFilter) => Promise<void>;
  resetFormValues: () => Promise<void>;
}
