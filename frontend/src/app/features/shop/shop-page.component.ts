import {CommonModule} from "@angular/common";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ActivatedRoute, Params} from "@angular/router";
import {debounceTime, Observable, Subscription} from "rxjs";
import {distinctUntilChanged} from "rxjs/operators";
import {LoaderComponent} from "../../shared/components/loader/loader.component";
import {ItemFilterBuilder} from "../../shared/models/builders/item-filter-builder";
import {Page} from "../../shared/models/interfaces/page";
import {Pagination} from "../../shared/models/pagination";
import {Api} from "../../shared/services/api.service";
import {ItemSummary} from "../../shared/services/api/item/item.interface";
import {CategoryService} from "../../shared/services/category.service";
import {NewItemService} from "../../shared/services/item/new-item.service";
import {SearchService} from "../../shared/services/search.service";
import {ContentSectionComponent} from "./components/content-section/content-section.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {SortingTabComponent} from "./components/sorting-tab/sorting-tab.component";
import {ShopPageParameter} from "./shop-routes";
import Category = Api.CategoryApi.Category;

@Component({
  selector: "app-shop",
  standalone: true,
  imports: [CommonModule, SidebarComponent, ContentSectionComponent, LoaderComponent, SortingTabComponent],
  templateUrl: "./shop-page.component.html",
  styleUrls: ["./shop-page.component.scss"]
})
export class ShopPage implements OnInit, OnDestroy {
  categories$: Observable<Array<Category> | undefined> | undefined;
  pagination: Pagination = new Pagination({page: 0, size: 9});
  items: Page<ItemSummary> | undefined;
  private subscription: Set<Subscription> = new Set<Subscription>();
  private itemFilterBuilder: ItemFilterBuilder = new ItemFilterBuilder();

  constructor(private activatedRoute: ActivatedRoute,
              private itemService: NewItemService,
              private categoryService: CategoryService,
              private searchService: SearchService) {


    this.activatedRoute.queryParams.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      takeUntilDestroyed(),
    ).subscribe((param: Params): void => {
      this.pagination.resetPageNumber();
      this.handleQueryParameterChange(param);
      this.fetchItems();
    });
  }

  ngOnInit(): void {
    this.initialiseCategories();
  }

  public ngOnDestroy(): void {
    this.unsubscribe();
  }

  loadMoreElements(): void {
    if (!this.pagination.isLastPageValue()) {
      this.pagination.increasePageNumber();
      this.fetchItems();
    }
  }

  private fetchItems(): void {
    this.unsubscribe();

    const filter = this.itemFilterBuilder.build();

    this.subscription.add(
      this.itemService.getItems({
        pageable: {
          page: this.pagination.getPagination().page,
          size: this.pagination.getPagination().size
        },
        name: filter.name,
        category: filter.category,
        subcategory: filter.subcategory,
        orderBy: filter.orderBy
      }).subscribe((items: Page<ItemSummary> | undefined) => {
        this.items = items;
        this.pagination.updatePaginationDetails(items?.last, items?.totalElements);
      })
    );
  }

  private unsubscribe(): void {
    this.subscription.forEach((subscription: Subscription) => subscription.unsubscribe());
    this.subscription.clear();
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
