import {Injectable, Signal} from "@angular/core";
import {PriceRangeFilter} from "../../../features/shop/components/price-range/filter/price-filter.interface";
import {PriceRangeFilterService} from "../../../features/shop/components/price-range/filter/price-filter.service";
import {PriceFilter} from "../../../features/shop/components/price-range/filter/price-filter.type";
import {CategoryFilterService} from "../../../features/shop/components/sidebar/filter/category-filter.service";
import {CategoryFilter} from "../../../features/shop/components/sidebar/filter/category-filter.type";
import {CategoryFiltration} from "../../../features/shop/components/sidebar/filter/category-filtration.interface";
import {Category} from "../api/category/category.type";
import {PriceRange} from "../api/item/item.type";
import {ItemFilterBuilder} from "./item-filter.builder";

@Injectable({
  providedIn: "root"
})
export class ItemFilterService implements CategoryFiltration, PriceRangeFilter {
  public readonly builder: ItemFilterBuilder = new ItemFilterBuilder();
  public readonly categoryFilter: Signal<CategoryFilter>;
  public readonly priceFilter: Signal<PriceFilter>;
  public readonly priceRangeLimit: Signal<PriceFilter>;

  constructor(
    private readonly categoryFilterService: CategoryFilterService,
    private readonly priceRangeFilterService: PriceRangeFilterService
  ) {
    this.categoryFilter = this.categoryFilterService.categoryFilter;
    this.priceFilter = this.priceRangeFilterService.priceFilter;
    this.priceRangeLimit = this.priceRangeFilterService.priceFilterLimit;
  }

  public excludeCategory = async (category: string): Promise<void> => {
    await this.categoryFilterService.excludeCategory(category);
  };

  public excludeSubcategory = async (category: string, subcategory: string): Promise<void> => {
    await this.categoryFilterService.excludeSubcategory(category, subcategory);
  };

  public includeCategories = async (categories: string[], subcategories: string[]): Promise<void> => {
    await this.categoryFilterService.includeCategories(categories, subcategories);
  };

  public includeCategory = async (category: string): Promise<void> => {
    await this.categoryFilterService.includeCategory(category);
  };

  public async includeSubcategory(category: string, subcategory: string): Promise<void> {
    await this.categoryFilterService.includeSubcategory(category, subcategory);
  }

  public initializeCategories = async (categories: Category[]): Promise<void> => {
    this.categoryFilterService.initializeCategories(categories);
  };

  public isCategoryIncluded = (category: string): boolean => {
    return this.categoryFilterService.isCategoryIncluded(category);
  };

  public isSubcategoryIncluded = (category: string, subcategory: string): boolean => {
    return this.categoryFilterService.isSubcategoryIncluded(category, subcategory);
  };

  public setMaxPrice = (max: number | null): Promise<void> => {
    return this.priceRangeFilterService.setMaxPrice(max);
  };

  public setMinimalPrice = (min: number | null): Promise<void> => {
    return this.priceRangeFilterService.setMinimalPrice(min);
  };

  public setPriceRangeLimit = (priceRange: PriceRange): void => {
    this.priceRangeFilterService.setPriceRangeLimit(priceRange);
  };

  public isFilterApplied = async (): Promise<boolean> => {
    return this.categoryFilterService.isFilterApplied()
      || this.priceRangeFilterService.isFilterApplied();
  };

  public resetCategoryFilter = async (): Promise<void> => {
    await this.categoryFilterService.resetFilter();
  };

  public resetPriceFilter = async (): Promise<void> => {
    await this.priceRangeFilterService.resetFilter();
  };

  public resetFilters = async (): Promise<void> => {
    await this.resetCategoryFilter();
    await this.resetPriceFilter();
  };
}

