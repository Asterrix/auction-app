import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {NavigationEnd, Router} from "@angular/router";
import {debounceTime, filter, pairwise, Subject, takeUntil} from "rxjs";
import {distinctUntilChanged, map} from "rxjs/operators";
import {Constant} from "../../../../models/enums/constant";
import {SearchService} from "../../../../services/search.service";

@Component({
  selector: "app-search-bar",
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ReactiveFormsModule],
  templateUrl: "search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"]
})
export class SearchBarComponent implements OnInit {
  @ViewChild("searchInput") searchFormElementRef!: ElementRef;

  searchValue: string = Constant.EmptyValue;
  searchForm = this.formBuilder.nonNullable.group({
    searchValue: Constant.EmptyValue
  });
  private destroy$ = new Subject<void>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly searchService: SearchService,
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
    this.searchForm.get("searchValue")?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe();

    // Clear search value when navigating from home to shop
    this.handleNavigationForSearchClearing();
  }

  onChange(): void {
    this.searchValue = this.searchForm.value.searchValue ?? Constant.EmptyValue;
    this.search();
  }

  handleSearchNavigation(): void {
    this.searchService.handleSearchNavigation(this.searchValue);
  }

  private handleNavigationForSearchClearing(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => event as NavigationEnd),
      pairwise(),
      takeUntil(this.destroy$))
      .subscribe(([previousUrl, currentUrl]) => {
        if ((this.isNavigatingToShop(currentUrl) && this.isInputNotInFocus()) ||
          this.isNavigatingAwayFromShop(previousUrl, currentUrl)) {
          this.clearSearchForm();
        }
      });
  }

  private isNavigatingToShop(currentUrl: NavigationEnd): boolean {
    return currentUrl.url.includes("/shop");
  }

  private isInputNotInFocus(): boolean {
    return document.activeElement !== this.searchFormElementRef?.nativeElement;
  }

  private isNavigatingAwayFromShop(previousUrl: NavigationEnd, currentUrl: NavigationEnd): boolean {
    return previousUrl.url.includes("/shop") && !this.isNavigatingToShop(currentUrl);
  }

  private clearSearchForm(): void {
    this.searchForm.patchValue({searchValue: Constant.EmptyValue});
  }

  private search(): void {
    if (this.searchValue === Constant.EmptyValue) {
      this.searchService.clearQueryParameter();
    } else {
      this.searchService.appendQueryParameter(this.searchValue);
    }
  }
}
