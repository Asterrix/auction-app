import {CommonModule} from "@angular/common";
import {Component, inject, OnInit, signal} from "@angular/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ActivatedRoute, Params} from "@angular/router";
import {debounceTime, Observable, take} from "rxjs";
import {distinctUntilChanged} from "rxjs/operators";
import {LoaderComponent} from "../../shared/components/loader/loader.component";
import {InfiniteScrollDirective} from "../../shared/directives/infinite-scroll.directive";
import {ItemFilterBuilder} from "../../shared/models/builders/item-filter-builder";
import {Page} from "../../shared/models/interfaces/page";
import {PaginationService} from "../../shared/models/pagination.service";
import {Api} from "../../shared/services/api.service";
import {ItemSummary} from "../../shared/services/api/item/item.interface";
import {CategoryService} from "../../shared/services/category.service";
import {ItemService} from "../../shared/services/item/item.service";
import {SearchService} from "../../shared/services/search/search.service";
import {ContentSectionComponent} from "./components/content-section/content-section.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {SortingTabComponent} from "./components/sorting-tab/sorting-tab.component";
import {ShopPageParameter} from "./shop-routes";
import Category = Api.CategoryApi.Category;

@Component({
  selector: "app-shop",
  standalone: true,
  imports: [CommonModule, SidebarComponent, ContentSectionComponent, LoaderComponent, SortingTabComponent, InfiniteScrollDirective],
  templateUrl: "./shop-page.component.html",
  styleUrls: ["./shop-page.component.scss"],
  providers: [
    {
      provide: PaginationService,
      useFactory: () => new PaginationService({page: 0, size: 9}),
    },
  ]
})
export class ShopPage implements OnInit {
  categories$: Observable<Array<Category> | undefined> | undefined;
  protected items = signal<ItemSummary[]>([]);
  private itemFilterBuilder: ItemFilterBuilder = new ItemFilterBuilder();
  private paginationService: PaginationService = inject(PaginationService);
  protected pagination = this.paginationService.pagination;

  constructor(private activatedRoute: ActivatedRoute,
              private itemService: ItemService,
              private categoryService: CategoryService,
              private searchService: SearchService) {


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


  ngOnInit(): void {
    this.initialiseCategories();
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
      category: filter.category,
      subcategory: filter.subcategory,
      orderBy: filter.orderBy
    });
  }

  private initialiseCategories(): void {
    this.categoryService.initCategories();
    this.categories$ = this.categoryService.getAllCategories();
  }

  private handleQueryParameterChange(param: Params): void {
    this.handleCategoryChange(param);
    this.handleSubcategoryChange(param);
    this.handleOrderByChange(param);
    this.handleSearch(param);
  }

  private handleSearch(param: Params): void {
    if (param[ShopPageParameter.Parameter.ItemName]) {
      this.searchService.resetCategoryAndSubcategoryParams();
    }
    this.itemFilterBuilder.filterByName(param[ShopPageParameter.Parameter.ItemName]);
  }

  private handleCategoryChange(param: Params): void {
    this.itemFilterBuilder.filterByCategory(param[ShopPageParameter.Parameter.Category]);
  }

  private handleSubcategoryChange(param: Params): void {
    this.itemFilterBuilder.filterBySubcategory(param[ShopPageParameter.Parameter.Subcategory]);
  }

  private handleOrderByChange(param: Params): void {
    this.itemFilterBuilder.orderBy(param[ShopPageParameter.Parameter.OrderBy]);
  }
}
