import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, Signal} from "@angular/core";
import {Observable} from "rxjs";
import {ItemFilterService} from "../../../../shared/services/item/item-filter.service";
import {PriceFilter} from "../price-range/filter/price-filter.type";
import {PriceFilterFormService} from "../price-range/form/price-filter-form.service";
import {CategoryFilter} from "../sidebar/filter/category-filter.type";
import {Menu} from "../sidebar/menu/menu";

@Component({
  selector: "app-filter-tab",
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: "./filter-tab.component.html",
  styleUrl: "./filter-tab.component.scss"
})
export class FilterTabComponent {
  protected menu: Menu = "closed";
  protected readonly categoryFilter: Signal<CategoryFilter>;
  protected readonly priceFilter: Signal<PriceFilter>;
  protected readonly nameFilter: Observable<string>;

  constructor(
    private readonly itemFilterService: ItemFilterService,
    private readonly priceFilterFormService: PriceFilterFormService) {
    this.categoryFilter = this.itemFilterService.categoryFilter;
    this.priceFilter = this.itemFilterService.priceFilter;
    this.nameFilter = this.itemFilterService.nameFilter;
  }

  protected toggleMenu = (): void => {
    this.menu = this.menu === "closed" ? "opened" : "closed";
  };

  protected clearFilters = async (): Promise<void> => {
    await this.itemFilterService.resetFiltersWithQueryParams();
    await this.resetPriceRangeFormValues();
  };

  protected excludeSubcategory = async (category: string, subcategory: string): Promise<void> => {
    await this.itemFilterService.excludeSubcategory(category, subcategory);
  };

  protected excludePriceRange = async (): Promise<void> => {
    await this.itemFilterService.resetPriceFilterWithQueryParams();
    await this.resetPriceRangeFormValues();
  };

  protected excludeName = async (): Promise<void> => {
    await this.itemFilterService.resetNameFilterWithQueryParams();
  }

  /*
  * Because of the way the component responsible for price filtration is implemented,
  * it is not directly tied to the filter service.
  * This means that when the price filter is reset, the form values are not reset.
  * This method is responsible for resetting the form values.
  *
  * TODO: Refactor the price filter component to be directly tied to the filter service.
  * */
  private resetPriceRangeFormValues = async (): Promise<void> => {
    await this.priceFilterFormService.resetFormValues();
  }
}

