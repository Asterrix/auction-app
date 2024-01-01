import {PriceRange} from "../../../../../shared/services/api/item/item.type";

interface PriceFilterMinMaxSetter {
  setMinimalPrice: (min: (number | null)) => Promise<void>;
  setMaxPrice: (max: (number | null)) => Promise<void>;
}

interface PriceRangeFilter {
  setPriceRangeLimit: (priceRange: PriceRange) => void;
  resetFilter(): Promise<void>;
}

export {
  PriceFilterMinMaxSetter,
  PriceRangeFilter
};
