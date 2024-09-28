import {CommonModule} from "@angular/common";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router, RouterLink} from "@angular/router";
import {debounceTime, Observable, Subscription} from "rxjs";
import {distinctUntilChanged} from "rxjs/operators";
import {ItemCardComponent} from "../../../../shared/components/item-card/item-card.component";
import {LoaderComponent} from "../../../../shared/components/loader/loader.component";
import {Page} from "../../../../shared/models/interfaces/page";
import {Pagination} from "../../../../shared/models/pagination";
import {Api} from "../../../../shared/services/api.service";
import {ItemService} from "../../../../shared/services/item.service";
import {ShopPageParameter} from "../../shop-routes";
import ItemParams = Api.ItemApi.GetMethods.ItemParams;
import ItemSummary = Api.ItemApi.Interfaces.ItemSummary;

@Component({
  selector: "shop-content-section",
  standalone: true,
  imports: [CommonModule, ItemCardComponent, RouterLink, LoaderComponent],
  templateUrl: "./content-section.component.html",
  styleUrls: ["./content-section.component.scss"]
})
export class ContentSectionComponent implements OnInit, OnDestroy {
  subscription: Record<string, Subscription> = {};
  items$: Observable<Page<ItemSummary> | undefined> | undefined;
  itemParams: Partial<ItemParams> = {};
  pagination = new Pagination({page: 0, size: 8});

  constructor(private itemService: ItemService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
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
      this.itemService.loadMoreData(this.itemParams, this.pagination.getPagination());
    }
  }

  navigateToItem(itemId: number): void {
    this.router.navigate(["/shop/item", itemId]).then(null);
  }

  private unsubscribe(): void {
    for (const key in this.subscription) {
      if (this.subscription[key]) {
        this.subscription[key].unsubscribe();
      }
    }
  }

  private handleQueryParameterChange(param: Params): void {
    this.handleCategoryChange(param);
    this.handleSubcategoryChange(param);
    this.handleSearch(param);
  }

  private handleSearch(param: Params): void {
    if (param[ShopPageParameter.Parameter.ItemName]) {
      this.resetCategoryAndSubcategoryParams();
      this.itemParams.itemName = param[ShopPageParameter.Parameter.ItemName];
    } else {
      this.itemParams.itemName = undefined;
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
    this.itemService.initItems(this.itemParams, this.pagination.getPagination());
  }

  private updatePaginationState(): void {
    this.subscription["pagination"] = this.itemService.getItems().subscribe((page: Page<ItemSummary> | undefined): void => {
      this.pagination.updatePaginationDetails(page?.last, page?.totalElements);
    });
  }

  private handleCategoryChange(param: Params): void {
    this.itemParams.category = param[ShopPageParameter.Parameter.Category] || undefined;
  }

  private handleSubcategoryChange(param: Params): void {
    this.itemParams.subcategory = param[ShopPageParameter.Parameter.Subcategory] || undefined;
  }

  private resetCategoryAndSubcategoryParams() {
    this.router.navigate([], {
      queryParams: {
        category: null,
        subcategory: null
      }, queryParamsHandling: "merge"
    }).then(null);
  }
}
