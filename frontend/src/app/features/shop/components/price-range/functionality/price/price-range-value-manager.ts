import {Injectable} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {PriceRange} from "../../../../../../shared/services/api/item/item.type";
import {Option} from "../../../../../../shared/types/Option.type";
import {paramExtractor} from "../../../../../../shared/utils/param-extractor/param-extractor";
import {PriceRangeQueryService} from "../../filter/price-range-query.service";
import {PriceRangeForm} from "../../type/price-range.type";
import {PriceRangeValueHandler} from "./price-range-value-handler.interface";

@Injectable({
  providedIn: "root"
})
export class PriceRangeValueManager implements PriceRangeValueHandler {
  constructor(private readonly priceRangeFilterService: PriceRangeQueryService) {
  }

  public handlePriceChange = async (priceRangeForm: PriceRangeForm, priceFilterValues: PriceRangeForm): Promise<boolean> => {
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

  public resetFilter = async (): Promise<void> => {
    await this.priceRangeFilterService.resetFilter();
  };
}
