import {Injectable, Signal} from "@angular/core";
import {Observable} from "rxjs";
import {PriceRangeFilter} from "../../../features/shop/components/price-range/filter/price-filter.interface";
import {PriceRangeFilterService} from "../../../features/shop/components/price-range/filter/price-filter.service";
import {PriceFilter} from "../../../features/shop/components/price-range/filter/price-filter.type";
import {CategoryFilterService} from "../../../features/shop/components/sidebar/filter/category-filter.service";
import {CategoryFilter} from "../../../features/shop/components/sidebar/filter/category-filter.type";
import {CategoryFiltration} from "../../../features/shop/components/sidebar/filter/category-filtration.interface";
import {Category} from "../api/category/category.type";
import {PriceRange} from "../api/item/item.type";
import {SearchService} from "../search/search.service";
import {ItemFilterBuilder} from "./item-filter.builder";

@Injectable({
  providedIn: "root"
})
export class ItemFilterService implements CategoryFiltration, PriceRangeFilter {
  // Builder
  public readonly builder: ItemFilterBuilder = new ItemFilterBuilder();

  // Category Filter
  public readonly categoryFilter: Signal<CategoryFilter>;

  // Price Filter
  public readonly priceFilter: Signal<PriceFilter>;
  public readonly priceRangeLimit: Signal<PriceFilter>;

  // Name Filter
  public readonly nameFilter: Observable<string>;

  constructor(
    private readonly categoryFilterService: CategoryFilterService,
    private readonly priceRangeFilterService: PriceRangeFilterService,
    private readonly searchService: SearchService
  ) {
    this.categoryFilter = this.categoryFilterService.categoryFilter;
    this.priceFilter = this.priceRangeFilterService.priceFilter;
    this.priceRangeLimit = this.priceRangeFilterService.priceFilterLimit;
    this.nameFilter = this.searchService.searchTerm;
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

  public setName = async (name: string): Promise<void> => {
    await this.searchService.updateSearchTerm(name);
  }

  public isFilterApplied = async (): Promise<boolean> => {
    return this.categoryFilterService.isFilterApplied()
      || this.priceRangeFilterService.isFilterApplied()
      || this.searchService.isFilterApplied();
  };

  public resetCategoryFilter = async (): Promise<void> => {
    await this.categoryFilterService.resetFilter();
  };

  public resetCategoryFilterWithQueryParams = async (): Promise<void> => {
    await this.categoryFilterService.resetFilterWithQueryParams();
  }

  public resetPriceFilter = async (): Promise<void> => {
    await this.priceRangeFilterService.resetFilter();
  };

  public resetPriceFilterWithQueryParams = async (): Promise<void> => {
    await this.priceRangeFilterService.resetFilterWithQueryParams();
  }

  public resetNameFilter = async (): Promise<void> => {
    await this.searchService.resetFilter();
  };

  public resetNameFilterWithQueryParams = async (): Promise<void> => {
    await this.searchService.resetFilterWithQueryParams();
  }

  public resetFilters = async (): Promise<void> => {
    await this.resetCategoryFilter();
    await this.resetPriceFilter();
    await this.resetNameFilter();
  };

  public resetFiltersWithQueryParams = async (): Promise<void> => {
    await this.resetCategoryFilterWithQueryParams();
    await this.resetPriceFilterWithQueryParams();
    await this.resetNameFilterWithQueryParams();
  }
}

