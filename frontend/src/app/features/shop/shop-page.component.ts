import {CommonModule} from "@angular/common";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {debounceTime, Observable, Subscription} from "rxjs";
import {distinctUntilChanged} from "rxjs/operators";
import {LoaderComponent} from "../../shared/components/loader/loader.component";
import {ItemFilterBuilder} from "../../shared/models/builders/item-filter-builder";
import {Page} from "../../shared/models/interfaces/page";
import {Pagination} from "../../shared/models/pagination";
import {Api} from "../../shared/services/api.service";
import {CategoryService} from "../../shared/services/category.service";
import {ItemService} from "../../shared/services/item/item.service";
import {SearchService} from "../../shared/services/search.service";
import {ContentSectionComponent} from "./components/content-section/content-section.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {ShopPageParameter} from "./shop-routes";
import Category = Api.CategoryApi.Category;
import ItemSummary = Api.ItemApi.Interfaces.ItemSummary;

@Component({
  selector: "app-shop",
  standalone: true,
  imports: [CommonModule, SidebarComponent, ContentSectionComponent, LoaderComponent],
  templateUrl: "./shop-page.component.html",
  styleUrls: ["./shop-page.component.scss"]
})
export class ShopPage implements OnInit, OnDestroy {
  categories$: Observable<Array<Category> | undefined> | undefined;
  items$: Observable<Page<ItemSummary> | undefined> | undefined;
  pagination: Pagination = new Pagination({page: 0, size: 9});
  private subscription: Record<string, Subscription> = {};
  private itemFilterBuilder: ItemFilterBuilder = new ItemFilterBuilder();


  constructor(private activatedRoute: ActivatedRoute,
              private itemService: ItemService,
              private categoryService: CategoryService,
              private searchService: SearchService) {
  }

  ngOnInit(): void {
    this.initialiseCategories();

    this.subscription["queryParams"] = this.activatedRoute.queryParams.pipe(
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe((param: Params): void => {
      this.pagination.resetPageNumber();
      this.handleQueryParameterChange(param);
      this.initialiseItems();
      this.updatePaginationState();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  loadMoreElements(): void {
    if (!this.pagination.isLastPageValue()) {
      this.pagination.increasePageNumber();
      this.itemService.loadMoreData(this.itemFilterBuilder.build(), this.pagination.getPagination());
    }
  }

  private initialiseItems(): void {
    this.initialiseItemsWithParameters();
    this.fetchItemsData();
  }

  private fetchItemsData(): void {
    this.items$ = this.itemService.getItems();
  }

  private initialiseItemsWithParameters(): void {
    this.itemService.initItems(this.itemFilterBuilder.build(), this.pagination.getPagination());
  }

  private unsubscribe(): void {
    for (const key in this.subscription) {
      if (this.subscription[key]) {
        this.subscription[key].unsubscribe();
      }
    }
  }

  private initialiseCategories(): void {
    this.categoryService.initCategories();
    this.categories$ = this.categoryService.getAllCategories();
  }

  private handleQueryParameterChange(param: Params): void {
    this.handleCategoryChange(param);
    this.handleSubcategoryChange(param);
    this.handleSearch(param);
  }

  private handleSearch(param: Params): void {
    if (param[ShopPageParameter.Parameter.ItemName]) {
      this.searchService.resetCategoryAndSubcategoryParams();
    }
    this.itemFilterBuilder.filterByName(param[ShopPageParameter.Parameter.ItemName]);
  }

  private updatePaginationState(): void {
    this.subscription["pagination"] = this.itemService.getItems().subscribe((page: Page<ItemSummary> | undefined): void => {
      this.pagination.updatePaginationDetails(page?.last, page?.totalElements);
    });
  }

  private handleCategoryChange(param: Params): void {
    this.itemFilterBuilder.filterByCategory(param[ShopPageParameter.Parameter.Category]);
  }

  private handleSubcategoryChange(param: Params): void {
    this.itemFilterBuilder.filterBySubcategory(param[ShopPageParameter.Parameter.Subcategory]);
  }

}
