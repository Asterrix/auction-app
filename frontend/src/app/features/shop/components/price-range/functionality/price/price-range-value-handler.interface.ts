import {ActivatedRoute} from "@angular/router";
import {PriceRangeFilter} from "../../filter/price-range.filter.interface";
import {PriceRangeForm} from "../../type/price-range.type";

export interface PriceRangeValueHandler extends PriceRangeFilter {
  handlePriceChange: (priceRangeForm: PriceRangeForm, priceFilterValues: PriceRangeForm) => Promise<boolean>;
  initializePriceRange: (activatedRoute: ActivatedRoute) => Promise<boolean>;
}
