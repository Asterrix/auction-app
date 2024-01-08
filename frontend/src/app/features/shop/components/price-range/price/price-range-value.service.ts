import {Injectable} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {PriceRange} from "../../../../../shared/services/api/item/item.type";
import {Option} from "../../../../../shared/types/Option.type";
import {paramExtractor} from "../../../../../shared/utils/param-extractor/param-extractor";
import {PriceRangeFilterService} from "../filter/price-filter.service";
import {PriceFilter} from "../filter/price-filter.type";
import {PriceRangeValueHandler} from "./price-range-value-handler.interface";

@Injectable({
  providedIn: "root"
})
export class PriceRangeValueService implements PriceRangeValueHandler {
  constructor(private readonly priceRangeFilterService: PriceRangeFilterService) {
  }

  /*
  * Handles the use case when the user makes changes to the price range filter.
  * If the price range filter values are different from the values that are currently applied to the price range filter,
  * the price range filter is updated with the new values.
  * @param priceRangeForm - the form that contains the price range filter values
  * @param priceFilterValues - the values that are currently applied to the price range filter
  * @returns true if the price range filter values are different from the values that are currently applied to the price range filter, false otherwise
  * */
  public handlePriceChange = async (priceRangeForm: PriceFilter, priceFilterValues: PriceFilter): Promise<boolean> => {
    const minPrice: number | null = priceRangeForm.minPrice;
    const maxPrice: number | null = priceRangeForm.maxPrice;

    const {minPrice: filterMinPrice, maxPrice: filterMaxPrice} = priceFilterValues;

    let priceChanged: boolean = false;

    if (minPrice !== filterMinPrice && !(minPrice && isNaN(minPrice))) {
      await this.setMinimalPrice(minPrice);
      priceChanged = true;
    }

    if (maxPrice !== filterMaxPrice && !(maxPrice && isNaN(maxPrice))) {
      await this.setMaxPrice(maxPrice);
      priceChanged = true;
    }

    return priceChanged;
  };

  /*
  * Handles the use case when the user navigates or refreshes the page with the price range filter applied.
  * If the price range filter is applied, the price range filter is initialized with the values from the query params.
  * @param activatedRoute - the route that is currently active
  * @returns true if the price range filter is applied, false otherwise
  * */
  public async initializePriceRange(activatedRoute: ActivatedRoute): Promise<boolean> {
    const queryParams: Params = activatedRoute.snapshot.queryParams;
    const minPrice: Option<string[]> = paramExtractor(queryParams, "minPrice");
    const maxPrice: Option<string[]> = paramExtractor(queryParams, "maxPrice");

    const minPriceValue: number = Number(minPrice.value);
    const maxPriceValue: number = Number(maxPrice.value);

    if (minPrice.present && maxPrice.present && !isNaN(minPriceValue) && !isNaN(maxPriceValue)) {
      await this.priceRangeFilterService.setMinimalPrice(minPriceValue);
      await this.priceRangeFilterService.setMaxPrice(maxPriceValue);

      return true;
    }

    return false;
  }

  public setMaxPrice = async (max: number | null): Promise<void> => {
    await this.priceRangeFilterService.setMaxPrice(max);
  };

  public setMinimalPrice = async (min: number | null): Promise<void> => {
    await this.priceRangeFilterService.setMinimalPrice(min);
  };

  public setPriceRangeLimit = async (priceRange: PriceRange): Promise<void> => {
    this.priceRangeFilterService.setPriceRangeLimit(priceRange);
  };
}
