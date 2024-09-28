import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, inject, OnInit} from "@angular/core";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {NavigationEnd, Router} from "@angular/router";
import {debounceTime} from "rxjs";
import {ShopPageParameter} from "../../../../../features/shop/shop-routes";
import {Constant} from "../../../../models/enums/constant";
import {SearchService} from "../../../../services/search/search.service";

@Component({
  selector: "app-search-bar",
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ReactiveFormsModule],
  templateUrl: "search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"]
})
export class SearchBarComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  protected searchForm = this.formBuilder.nonNullable.group({
    searchValue: Constant.EmptyValue
  });
  private searchService = inject(SearchService);
  private router = inject(Router);

  ngOnInit(): void {
    this.searchForm.controls.searchValue.valueChanges
      .pipe(debounceTime(300))
      .subscribe(async () => await this.search());

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && !event.url.includes(ShopPageParameter.Parameter.ItemName)) {
        if (this.searchForm.controls.searchValue.value !== Constant.EmptyValue) {
          this.searchForm.patchValue({
            searchValue: Constant.EmptyValue
          });
        }
      }
    });
  }

  protected async handleSearchNavigation() {
    const searchValue = this.searchForm.controls.searchValue.value;

    await this.searchService.navigateToShopPage(searchValue);
  }

  private async search() {
    const searchValue = this.searchForm.controls.searchValue.value;
    await this.saveSearchQuery(searchValue);

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
