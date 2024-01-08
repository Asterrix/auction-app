import {computed, Injectable, Signal, signal, WritableSignal} from "@angular/core";
import {Router} from "@angular/router";
import {updateQueryParams} from "src/app/shared/utils/query-param.helper";
import {Filter} from "../../../../../shared/interfaces/filters/filter.interface";
import {PriceRange} from "../../../../../shared/services/api/item/item.type";
import {PriceRangeFilter} from "./price-filter.interface";
import {PriceFilter} from "./price-filter.type";


@Injectable({
  providedIn: "root"
})
export class PriceRangeFilterService implements PriceRangeFilter, Filter {
  // Default values
  private readonly defaultPriceFilter: PriceFilter = {minPrice: null, maxPrice: null};
  private readonly defaultPriceRangeLimit: PriceRange = {minPrice: 0, maxPrice: 0};

  // Filter
  private priceFilterSignal: WritableSignal<PriceFilter> = signal<PriceFilter>(this.defaultPriceFilter);
  public readonly priceFilter: Signal<PriceFilter> = computed(() => this.priceFilterSignal());

  // Limiter
  private priceFilterLimitSignal: WritableSignal<PriceRange> = signal<PriceRange>(this.defaultPriceRangeLimit);
  public readonly priceFilterLimit: Signal<PriceRange> = computed(() => this.priceFilterLimitSignal());

  constructor(private readonly router: Router) {
  }

  public setPriceRangeLimit = (priceRange: PriceRange): void => {
    this.priceFilterLimitSignal.set(priceRange);
  };

  public setMinimalPrice = async (min: number | null): Promise<void> => {
    const currentPriceRange: PriceFilter = this.priceFilterSignal();
    const priceRangeLimit: PriceRange = this.priceFilterLimitSignal();

    if (!currentPriceRange || !priceRangeLimit) {
      return;
    }

    let newMinPrice: number | null = min;
    let newMaxPrice: number | null = currentPriceRange.maxPrice;

    if (min === null) {
      newMaxPrice = null;
    } else {
      newMinPrice = Math.max(min, priceRangeLimit.minPrice);

      if (newMaxPrice && newMinPrice > newMaxPrice) {
        newMaxPrice = newMinPrice;
      }

      if (newMaxPrice === null) {
        newMaxPrice = priceRangeLimit.maxPrice;
      }
    }

    await this.setNewPriceRange(newMinPrice, newMaxPrice);
    await this.updateQueryParams();
  };


  public setMaxPrice = async (max: number | null): Promise<void> => {
    const currentPriceRange: PriceFilter = this.priceFilterSignal();
    const priceRangeLimit: PriceRange = this.priceFilterLimitSignal();

    if (!currentPriceRange || !priceRangeLimit) {
      return;
    }

    let newMaxPrice: number | null = max;
    let newMinPrice: number | null = currentPriceRange.minPrice;

    if (max === null) {
      newMinPrice = null;
    } else {
      newMaxPrice = Math.min(max, priceRangeLimit.maxPrice);

      if (newMinPrice && newMaxPrice < newMinPrice) {
        newMinPrice = newMaxPrice;
      }

      if (newMinPrice === null) {
        newMinPrice = priceRangeLimit.minPrice;
      }
    }

    await this.setNewPriceRange(newMinPrice, newMaxPrice);
    await this.updateQueryParams();
  };

  public isFilterApplied = async (): Promise<boolean> => {
    return this.priceFilterSignal().minPrice !== null && this.priceFilterSignal().maxPrice !== null;
  };

  public excludeFilter = async (clearQueryParams: boolean): Promise<void> => {
    this.priceFilterSignal.set(this.defaultPriceFilter);

    if (clearQueryParams) {
      await this.router.navigate([], {
        queryParams: {
          minPrice: null,
          maxPrice: null
        },
        queryParamsHandling: "merge"
      });
    }
  };

  private async setNewPriceRange(minPrice: number | null, maxPrice: number | null): Promise<void> {
    this.priceFilterSignal.set({minPrice, maxPrice});
    await this.updateQueryParams();
  }

  private updateQueryParams = async (): Promise<void> => {
    const currentPriceRange: PriceFilter = this.priceFilterSignal();

    if (!currentPriceRange.maxPrice || !currentPriceRange.minPrice) {
      return;
    }

    await updateQueryParams(this.router, [
      {
        key: "minPrice",
        value: currentPriceRange.minPrice
      },
      {
        key: "maxPrice",
        value: currentPriceRange.maxPrice
      }
    ]);
  };
}
