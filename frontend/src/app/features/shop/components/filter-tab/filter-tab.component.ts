import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, Signal} from "@angular/core";
import {PriceRangeFilterService} from "../price-range/filter/price-range-query.service";
import {PriceRangeForm} from "../price-range/type/price-range.type";
import {CategoryFilterService} from "../sidebar/filter/category-filter.service";
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
  protected readonly priceFilter: Signal<PriceRangeForm>;

  constructor(
    private readonly categoryFilterService: CategoryFilterService,
    private readonly priceFilterService: PriceRangeFilterService,
  ) {
    this.categoryFilter = this.categoryFilterService.categoryFilter;
    this.priceFilter = this.priceFilterService.priceRange;
  }

  protected toggleMenu = (): void => {
    this.menu = this.menu === "closed" ? "opened" : "closed";
  };

}

