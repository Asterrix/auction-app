import {CommonModule} from "@angular/common";
import {Component, computed, inject, signal} from "@angular/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ActivatedRoute, Params} from "@angular/router";
import {debounceTime, Observable, take} from "rxjs";
import {distinctUntilChanged} from "rxjs/operators";
import {LoaderComponent} from "../../shared/components/loader/loader.component";
import {InfiniteScrollDirective} from "../../shared/directives/infinite-scroll.directive";
import {ItemFilterBuilder} from "../../shared/models/builders/item-filter-builder";
import {Page} from "../../shared/models/interfaces/page";
import {PaginationService} from "../../shared/models/pagination.service";
import {ItemSummary} from "../../shared/services/api/item/item.interface";
import {ItemService} from "../../shared/services/item/item.service";
import {ContentSectionComponent} from "./components/content-section/content-section.component";
import {FilterTabComponent} from "./components/filter-tab/filter-tab.component";
import {PriceRangeFilterService} from "./components/price-range/filter/price-range-query.service";
import {PriceRangeSelectorComponent} from "./components/price-range/price-range-selector.component";
import {PriceRangeForm} from "./components/price-range/type/price-range.type";
import {CategoryFilterService} from "./components/sidebar/filter/category-filter.service";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {SortingTabComponent} from "./components/sorting-tab/sorting-tab.component";
import {ShopPageParameter} from "./shop-routes";

@Component({
  selector: "app-shop",
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    ContentSectionComponent,
    LoaderComponent,
    SortingTabComponent,
    InfiniteScrollDirective,
    PriceRangeSelectorComponent,
    FilterTabComponent
  ],
  templateUrl: "./shop-page.component.html",
  styleUrls: ["./shop-page.component.scss"],
  providers: [
    {
      provide: PaginationService,
      useFactory: () => new PaginationService({page: 0, size: 9}),
    },
  ]
})
export class ShopPage {
  protected items = signal<ItemSummary[]>([]);
  private itemFilterBuilder: ItemFilterBuilder = new ItemFilterBuilder();
  private paginationService: PaginationService = inject(PaginationService);
  protected pagination = this.paginationService.pagination;
  private readonly categoryFilterService = inject(CategoryFilterService);
  private readonly priceRangeFilterService = inject(PriceRangeFilterService);

  constructor(private activatedRoute: ActivatedRoute,
              private itemService: ItemService) {

    this.activatedRoute.queryParams.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      takeUntilDestroyed(),
    ).subscribe((param: Params): void => {
      this.paginationService.resetPagination();
      this.handleQueryParameterChange(param);

      this.getItems()
        .pipe(take(1))
        .subscribe((items: Page<ItemSummary>) => {
          this.items.update(() => items.content);
          this.paginationService.updatePaginationDetails(items.last, items.totalElements);
        });
    });
  }

  loadMoreElements(): void {
    if (!this.pagination().isLastPage) {
      this.paginationService.increasePageNumber();

      this.getItems()
        .pipe(take(1))
        .subscribe((items: Page<ItemSummary>) => {
            this.items.update((item: ItemSummary[]) => item.concat(items.content));
            this.paginationService.updatePaginationDetails(items.last, items.totalElements);
          }
        );
    }
  }

  private getItems(): Observable<Page<ItemSummary>> {
    const filter = this.itemFilterBuilder.build();

    return this.itemService.getItems({
      pageable: {
        page: this.pagination().page,
        size: this.pagination().size
      },
      name: filter.name,
      categories: filter.categories,
      priceRange: filter.priceRange,
      orderBy: filter.orderBy
    });
  }

  private handleQueryParameterChange = async (param: Params) => {
    this.handleOrderByChange(param);
    this.handleCategoryChange();
    await this.handlePriceRangeChange();
    this.handleSearch(param);
  };

  private handleCategoryChange() {
    const categories = this.categoryFilterService.categoryFilter();
    this.itemFilterBuilder.filterByCategories(categories);
  }

  private handlePriceRangeChange = async (): Promise<void> => {
    const priceRange: PriceRangeForm = this.priceRangeFilterService.priceRange();
    await this.itemFilterBuilder.filterByPriceRange(priceRange);
  };

  private handleSearch(param: Params): void {
    this.itemFilterBuilder.filterByName(param[ShopPageParameter.Parameter.ItemName]);
  }

  private handleOrderByChange(param: Params): void {
    this.itemFilterBuilder.orderBy(param[ShopPageParameter.Parameter.OrderBy]);
  }
}
