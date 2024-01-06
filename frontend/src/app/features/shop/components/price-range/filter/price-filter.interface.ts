import {PriceRange} from "../../../../../shared/services/api/item/item.type";

interface PriceRangeFilter {
  setPriceRangeLimit: (priceRange: PriceRange) => void;
  setMinimalPrice: (min: (number | null)) => Promise<void>;
  setMaxPrice: (max: (number | null)) => Promise<void>;
}

export {
  PriceRangeFilter
};
