import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {NavigationEnd, Router} from "@angular/router";
import {debounceTime, Subject, takeUntil} from "rxjs";
import {ShopPageParameter} from "../../../../../features/shop/shop-routes";
import {Constant} from "../../../../models/enums/constant";
import {ItemFilterService} from "../../../../services/item/item-filter.service";
import {SearchService} from "../../../../services/search/search.service";

@Component({
  selector: "app-search-bar",
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ReactiveFormsModule],
  templateUrl: "search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"]
})
export class SearchBarComponent implements OnInit, OnDestroy {
  protected searchForm = this.formBuilder.nonNullable.group({
    searchValue: ""
  });

  // Memory management
  private $destroy = new Subject<void>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly searchService: SearchService,
    private readonly router: Router,
    private readonly itemFilterService: ItemFilterService
  ) {
  }

  public async ngOnInit(): Promise<void> {
    await this.subscribeToFormValueChanges();
    await this.subscribeToRoutingEvent();
    await this.handleQueryParam();
  }

  public async ngOnDestroy(): Promise<void> {
    this.$destroy.next();
    this.$destroy.complete();
  }

  protected async handleSearchNavigation() {
    const searchValue = this.searchForm.controls.searchValue.value;

    await this.searchService.navigateToShopPage(searchValue);
  }

  private async handleQueryParam(): Promise<void> {
    this.itemFilterService.nameFilter
      .pipe(
        takeUntil(this.$destroy)
      ).subscribe(async (nameFilter: string) => {
      this.searchForm.patchValue({
        searchValue: nameFilter
      });
    });
  }

  /*
  * TODO: This is broken and it does not work.
  * */
  private subscribeToRoutingEvent = async (): Promise<void> => {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && !event.url.includes(ShopPageParameter.Parameter.ItemName)) {
        if (this.searchForm.controls.searchValue.value !== Constant.EmptyValue) {
          this.searchForm.patchValue({
            searchValue: Constant.EmptyValue
          });
        }
      }
    });
  };

  private subscribeToFormValueChanges = async (): Promise<void> => {
    this.searchForm.controls.searchValue.valueChanges
      .pipe(
        debounceTime(300),
        takeUntil(this.$destroy)
      ).subscribe(async () => await this.search());
  };

  private async search() {
    const searchValue = this.searchForm.controls.searchValue.value;
    await this.saveSearchQuery(searchValue);
    await this.searchService.updateSearchTerm(searchValue);

    if (searchValue === Constant.EmptyValue) {
      await this.searchService.clearSearchParameter();
    } else {
      await this.searchService.appendQueryParameter(searchValue);
    }
  }

  private async saveSearchQuery(searchValue: string) {
    this.searchService.saveSearchQuery(searchValue);
  }
}
