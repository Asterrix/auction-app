import {PriceRangeForm} from "../../../features/shop/components/price-range/type/price-range.type";
import {CategoryFilter} from "../../../features/shop/components/sidebar/filter/category-filter.type";
import {ItemOrderBy} from "../../services/api/item/item.enum";
import {CategoryRequest, GetItemsParams, PriceRange} from "../../services/api/item/item.type";

export class ItemFilterBuilder {
  private itemParams: Partial<GetItemsParams> = {};


  filterByName(itemName: string | undefined): void {
    this.itemParams.name = itemName;
  }

  filterByCategories(categories: CategoryFilter): void {
    let cat: CategoryRequest[] = [];

    for (const [first, second] of categories) {
      cat.push({category: first, subcategories: second});
    }

    this.itemParams.categories = cat;
  }

  filterByPriceRange = async (priceRange: PriceRangeForm) => {
    if (priceRange.minPrice === 0 && priceRange.maxPrice === 0) {
      this.itemParams.priceRange = undefined;
    } else if(priceRange.minPrice === null || priceRange.maxPrice === null) {
      this.itemParams.priceRange = undefined;
    } else if(priceRange.minPrice >= 0 && priceRange.maxPrice >= priceRange.minPrice){
      this.itemParams.priceRange = {
        minPrice: priceRange.minPrice,
        maxPrice: priceRange.maxPrice
      };
    }
  };

  orderBy(orderBy: string | undefined): this {
    const isOrderByValid: boolean = Object.values(ItemOrderBy).includes(orderBy as ItemOrderBy);
    const findOrderBy = Object.values(ItemOrderBy).find((value) => value === orderBy);

    this.itemParams.orderBy = isOrderByValid ? findOrderBy : undefined;

    return this;
  }

  build(): Partial<GetItemsParams> {
    return this.itemParams;
  }
}
