import {CommonModule} from "@angular/common";
import {Component, OnDestroy, OnInit, signal} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {debounceTime, Observable, Subject, take, takeUntil} from "rxjs";
import {distinctUntilChanged} from "rxjs/operators";
import {LoaderComponent} from "../../shared/components/loader/loader.component";
import {InfiniteScrollDirective} from "../../shared/directives/infinite-scroll.directive";
import {Page} from "../../shared/models/interfaces/page";
import {PaginationService} from "../../shared/models/pagination.service";
import {ItemSummary} from "../../shared/services/api/item/item.interface";
import {GetItemsParams} from "../../shared/services/api/item/item.type";
import {ItemFilterService} from "../../shared/services/item/item-filter.service";
import {ItemService} from "../../shared/services/item/item.service";
import {ContentSectionComponent} from "./components/content-section/content-section.component";
import {FilterTabComponent} from "./components/filter-tab/filter-tab.component";
import {PriceFilter} from "./components/price-range/filter/price-filter.type";
import {PriceRangeSelectorComponent} from "./components/price-range/price-range-selector.component";
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
export class ShopPage implements OnInit, OnDestroy {
  protected items = signal<ItemSummary[]>([]);
  protected pagination = this.paginationService.pagination;
  protected filters = signal<boolean>(false);
  private destroy$ = new Subject<void>();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly itemService: ItemService,
    private readonly itemFilterService: ItemFilterService,
    private readonly paginationService: PaginationService
  ) {
  }

  public async ngOnInit(): Promise<void> {
    this.subscribeToQueryParamChanges();
    await this.filtersAreApplied();
    await this.handleSearchQueryParam();
  }

  public async ngOnDestroy(): Promise<void> {
    this.destroy$.next();
    this.destroy$.complete();
    await this.resetFilters();
  }

  protected loadMoreElements(): void {
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

  private handleSearchQueryParam = async (): Promise<void> => {
    const searchValue = this.activatedRoute.snapshot.queryParams[ShopPageParameter.Parameter.ItemName];

    if (searchValue) {
      await this.itemFilterService.setName(searchValue);
    }
  };

  private async filtersAreApplied(): Promise<void> {
    const filterApplied: boolean = await this.itemFilterService.isFilterApplied();
    this.filters.update(() => filterApplied);
  }

  private subscribeToQueryParamChanges(): void {
    this.activatedRoute.queryParams.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(async (param: Params): Promise<void> => {
      this.paginationService.resetPagination();
      await this.handleQueryParameterChange(param);

      this.getItems()
        .pipe(take(1))
        .subscribe((items: Page<ItemSummary>) => {
          this.items.update(() => items.content);
          this.paginationService.updatePaginationDetails(items.last, items.totalElements);
        });

      await this.filtersAreApplied();
    });
  }

  private getItems(): Observable<Page<ItemSummary>> {
    const filter: Partial<GetItemsParams> = this.itemFilterService.builder.build();

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
    await this.handleOrderByChange(param);
    await this.handleCategoryChange();
    await this.handlePriceRangeChange();
    await this.handleSearch(param);
  };

  private handleCategoryChange = async () => {
    const categories = this.itemFilterService.categoryFilter();
    await this.itemFilterService.builder.filterByCategories(categories);
  };

  private handlePriceRangeChange = async (): Promise<void> => {
    const priceRange: PriceFilter = this.itemFilterService.priceFilter();
    await this.itemFilterService.builder.filterByPriceRange(priceRange);
  };

  private handleSearch = async (param: Params): Promise<void> => {
    await this.itemFilterService.builder.filterByName(param[ShopPageParameter.Parameter.ItemName]);
  };

  private handleOrderByChange = async (param: Params): Promise<void> => {
    await this.itemFilterService.builder.orderBy(param[ShopPageParameter.Parameter.OrderBy]);
  };

  private resetFilters = async (): Promise<void> => {
    await this.itemFilterService.resetFilters(false);
  };
}
