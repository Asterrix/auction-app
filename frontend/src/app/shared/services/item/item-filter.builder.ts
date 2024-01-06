import {ItemOrderBy} from "../api/item/item.enum";
import {CategoryRequest, GetItemsParams} from "../api/item/item.type";
import {PriceFilter} from "../../../features/shop/components/price-range/filter/price-filter.type";
import {CategoryFilter} from "../../../features/shop/components/sidebar/filter/category-filter.type";

export class ItemFilterBuilder {
  private filter: Partial<GetItemsParams> = {};

  public filterByName = async (name: string | undefined): Promise<this> => {
    this.filter.name = name;
    return this;
  };

  public filterByCategories = async (categories: CategoryFilter): Promise<this> => {
    let categoryRequest: CategoryRequest[] = [];

    for (const [first, second] of categories) {
      categoryRequest.push({category: first, subcategories: second});
    }

    this.filter.categories = categoryRequest;
    return this;
  };

  public filterByPriceRange = async (priceRange: PriceFilter): Promise<this> => {
    if ((priceRange.minPrice === 0 && priceRange.maxPrice === 0) ||
      priceRange.minPrice === null ||
      priceRange.maxPrice === null) {
      this.filter.priceRange = undefined;
    } else if (priceRange.minPrice >= 0 && priceRange.maxPrice >= priceRange.minPrice) {
      this.filter.priceRange = {minPrice: priceRange.minPrice, maxPrice: priceRange.maxPrice};
    }

    return this;
  };

  public orderBy = async (orderBy: string | undefined): Promise<this> => {
    const isOrderByValid: boolean = Object.values(ItemOrderBy).includes(orderBy as ItemOrderBy);
    const findOrderBy = Object.values(ItemOrderBy).find((value) => value === orderBy);

    this.filter.orderBy = isOrderByValid ? findOrderBy : undefined;

    return this;
  };

  public resetFilter = async (): Promise<void> => {
    this.filter = {};
  };

  public build = (): Partial<GetItemsParams> => {
    return this.filter;
  };
}
