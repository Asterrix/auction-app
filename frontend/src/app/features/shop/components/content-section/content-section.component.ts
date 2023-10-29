import {CommonModule} from "@angular/common";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router, RouterLink} from "@angular/router";
import {debounceTime, Observable, Subscription} from "rxjs";
import {distinctUntilChanged} from "rxjs/operators";
import {ItemCardComponent} from "../../../../shared/components/item-card/item-card.component";
import {LoaderComponent} from "../../../../shared/components/loader/loader.component";
import {Page} from "../../../../shared/models/interfaces/page";
import {Api} from "../../../../shared/services/api.service";
import {ItemService} from "../../../../shared/services/item.service";
import {LoaderService} from "../../../../shared/services/loader.service";
import {ShopPageParameter} from "../../shop-routes";
import Pagination = Api.Interfaces.Pagination;
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
  paginationDetails: Required<{ last: boolean, totalElements: number }> = {last: true, totalElements: 0};
  itemParams: Partial<ItemParams> = {};
  pagination: Required<Pagination> = {page: 0, size: 8};
  loader$: Observable<boolean> = this.loader.loading$;

  constructor(private itemService: ItemService, private router: Router, private activatedRoute: ActivatedRoute, private loader: LoaderService) {
  }

  ngOnInit(): void {
    this.subscription["queryParams"] = this.activatedRoute.queryParams.pipe(
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe((param: Params): void => {
      this.resetPageNumber();
      this.handleQueryParameterChange(param);
      this.initialiseItems();
      this.updatePaginationState();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  private unsubscribe(): void {
    for (const key in this.subscription) {
      if (this.subscription[key]) {
        this.subscription[key].unsubscribe();
      }
    }
  }

  loadMoreElements(): void {
    if (!this.paginationDetails.last) {
      this.pagination.page += 1;
      this.itemService.loadMoreData(this.itemParams, this.pagination);
    }
  }

  navigateToItem(itemId: number): void {
    this.router.navigate(["/shop/item", itemId]).then(null);
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
    this.itemService.initItems(this.itemParams, this.pagination);
  }

  private updatePaginationState(): void {
    this.subscription["pagination"] = this.itemService.getItems().subscribe((page: Page<ItemSummary> | undefined): void => {
      const last: boolean = page?.last ?? true;
      const totalElements: number = page?.totalElements ?? 0;
      this.paginationDetails = {last: last, totalElements: totalElements};
    });
  }

  private handleCategoryChange(param: Params): void {
    this.itemParams.category = param[ShopPageParameter.Parameter.Category] || undefined;
  }

  private handleSubcategoryChange(param: Params): void {
    this.itemParams.subcategory = param[ShopPageParameter.Parameter.Subcategory] || undefined;
  }

  private resetPageNumber(): void {
    this.pagination.page = 0;
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
