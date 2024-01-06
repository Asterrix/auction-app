import {ActivatedRoute} from "@angular/router";
import {PriceRangeFilter} from "../filter/price-filter.interface";
import {PriceFilter} from "../filter/price-filter.type";

export interface PriceRangeValueHandler extends PriceRangeFilter {
  handlePriceChange: (priceRangeForm: PriceFilter, priceFilterValues: PriceFilter) => Promise<boolean>;
  initializePriceRange: (activatedRoute: ActivatedRoute) => Promise<boolean>;
}
