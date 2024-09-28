import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, OnInit} from "@angular/core";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {NavigationEnd, Router} from "@angular/router";
import {debounceTime, filter, pairwise, Subject, takeUntil} from "rxjs";
import {distinctUntilChanged, map} from "rxjs/operators";
import {SearchService} from "../../../../services/search/search.service";
import {SearchSuggestionService} from "../../../../services/suggestion/search-suggestion.service";

@Component({
  selector: "app-search-bar",
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ReactiveFormsModule],
  templateUrl: "search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"]
})
export class SearchBarComponent implements OnInit {
  searchForm = this.formBuilder.nonNullable.group({
    searchValue: ""
  });
  private destroy$ = new Subject<void>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly searchService: SearchService,
    private readonly searchSuggestionService: SearchSuggestionService,
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
    this.searchForm.controls.searchValue.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(async (value): Promise<void> => {
      await this.searchService.appendQueryParameter(value);
    });

    // Clear search value when navigating from home to shop
    this.handleNavigationForSearchClearing();
  }

  handleSearchNavigation = async (): Promise<void> => {
    await this.searchService.navigateToShopPage(this.searchForm.controls.searchValue.value);
  };

  private handleNavigationForSearchClearing(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => event as NavigationEnd),
      pairwise(),
      takeUntil(this.destroy$))
      .subscribe(async ([previousUrl, currentUrl]) => {
        if (this.isNavigatingAwayFromShop(previousUrl, currentUrl)) {
          this.clearSearchForm();
          this.searchSuggestionService.clearSuggestion();
          await this.searchService.clearSearchParameter();
        }
      });
  }

  private isNavigatingToShop(currentUrl: NavigationEnd): boolean {
    return currentUrl.url.includes("/shop");
  }

  private isNavigatingAwayFromShop(previousUrl: NavigationEnd, currentUrl: NavigationEnd): boolean {
    return previousUrl.url.includes("/shop") && !this.isNavigatingToShop(currentUrl);
  }

  private clearSearchForm(): void {
    this.searchForm.patchValue({searchValue: ""});
  }
}
