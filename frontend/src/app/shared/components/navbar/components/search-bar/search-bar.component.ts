import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {debounceTime, Subscription} from "rxjs";
import {distinctUntilChanged} from "rxjs/operators";
import {Constant} from "../../../../models/enums/constant";
import {SearchService} from "../../../../services/search.service";

@Component({
  selector: "app-search-bar",
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ReactiveFormsModule],
  templateUrl: "search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"]
})
export class SearchBarComponent implements OnInit, OnDestroy {
  searchForm = this.formBuilder.nonNullable.group({
    searchValue: ""
  });
  private searchValue: string = Constant.EmptyValue;
  private readonly searchSuggestionLowerThreshold = 3;
  private readonly searchSuggestionHigherThreshold = 20;
  private subscription: Record<string, Subscription> = {};

  constructor(private formBuilder: FormBuilder, private searchService: SearchService) {
  }

  ngOnInit(): void {
    this.searchForm.get("searchValue")?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      if (this.searchValue.length >= this.searchSuggestionLowerThreshold && this.searchValue.length <= this.searchSuggestionHigherThreshold) {
        this.searchService.getSearchSuggestion();
        this.searchService.handleDisplay();
      } else {
        this.searchService.hideDidYouMean();
        this.searchService.resetSuggestion();
      }
    });

    this.subscription["searchTerm"] = this.searchService.getSearchTerm().subscribe((value) => {
      this.searchForm.patchValue({searchValue: value});
    });
  }

  onChange(): void {
    this.searchValue = this.searchForm.value.searchValue ?? Constant.EmptyValue;
    this.searchService.setSearchTerm(this.searchValue);
    this.search();
  }

  handleSearchNavigation(): void {
    this.searchService.handleSearchNavigation(this.searchValue);
  }

  ngOnDestroy(): void {
    for (const key in this.subscription) {
      if (this.subscription[key]) {
        this.subscription[key].unsubscribe();
      }
    }
  }

  private search(): void {
    if (this.searchValue === Constant.EmptyValue) {
      this.searchService.clearQueryParameter();
    } else {
      this.searchService.appendQueryParameter(this.searchValue);
    }
  }
}
