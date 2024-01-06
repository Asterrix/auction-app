import {computed, Injectable, Signal, signal, WritableSignal} from "@angular/core";
import {Router} from "@angular/router";
import {updateQueryParams} from "src/app/shared/utils/query-param.helper";
import {PriceRange} from "../../../../../shared/services/api/item/item.type";
import {PriceRangeForm} from "../type/price-range.type";
import {PriceFilterMinMaxSetter, PriceRangeFilter} from "./price-range.filter.interface";


@Injectable({
  providedIn: "root"
})
export class PriceRangeFilterService implements PriceRangeFilter, PriceFilterMinMaxSetter {
  // Filter
  private priceRangeSignal: WritableSignal<PriceRangeForm> = signal<PriceRangeForm>({minPrice: null, maxPrice: null});
  public readonly priceRange: Signal<PriceRangeForm> = computed(() => this.priceRangeSignal());

  // Limiter
  private priceRangeLimitSignal: WritableSignal<PriceRange> = signal<PriceRange>({minPrice: 0, maxPrice: 0});
  public readonly priceRangeLimit: Signal<PriceRange> = computed(() => this.priceRangeLimitSignal());

  constructor(private readonly router: Router) {
  }

  public setPriceRangeLimit = (priceRange: PriceRange): void => {
    this.priceRangeLimitSignal.set(priceRange);
  };

  public setMinimalPrice = async (min: number | null): Promise<void> => {
    const currentPriceRange: PriceRangeForm = this.priceRangeSignal();
    const priceRangeLimit: PriceRange = this.priceRangeLimitSignal();

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
    const currentPriceRange: PriceRangeForm = this.priceRangeSignal();
    const priceRangeLimit: PriceRange = this.priceRangeLimitSignal();

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


  public async resetFilter(): Promise<void> {
    this.priceRangeSignal.set({minPrice: null, maxPrice: null});
    this.priceRangeLimitSignal.set({minPrice: 0, maxPrice: 0});
  }

  private async setNewPriceRange(minPrice: number | null, maxPrice: number | null): Promise<void> {
    this.priceRangeSignal.set({minPrice, maxPrice});
    await this.updateQueryParams();
  }

  private updateQueryParams = async (): Promise<void> => {
    const currentPriceRange: PriceRangeForm = this.priceRangeSignal();

    await updateQueryParams(this.router, [
      {
        key: "minPrice",
        value: currentPriceRange.minPrice!
      },
      {
        key: "maxPrice",
        value: currentPriceRange.maxPrice!
      }
    ]);
  };
}
