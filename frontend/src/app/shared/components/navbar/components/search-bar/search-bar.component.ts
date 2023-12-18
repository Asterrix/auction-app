import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, inject, OnInit} from "@angular/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {NavigationStart, Router} from "@angular/router";
import {debounceTime} from "rxjs";
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
export class SearchBarComponent implements OnInit {
  searchValue: string = Constant.EmptyValue;
  searchForm = this.formBuilder.nonNullable.group({
    searchValue: Constant.EmptyValue
  });
  private router = inject(Router);

  constructor(private formBuilder: FormBuilder, private searchService: SearchService) {

    this.router.events
      .pipe(takeUntilDestroyed())
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          if (!event.url.includes("itemName")
            && this.searchValue !== Constant.EmptyValue
            && this.searchForm.controls.searchValue.value !== Constant.EmptyValue) {

            this.searchValue = Constant.EmptyValue;
            this.searchForm.patchValue({
              searchValue: Constant.EmptyValue
            });
          }
        }
      });
  }

  ngOnInit(): void {
    this.searchForm.get("searchValue")?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe();
  }

  onChange(): void {
    this.searchValue = this.searchForm.value.searchValue ?? Constant.EmptyValue;
    this.search();
  }

  handleSearchNavigation(): void {
    this.searchService.handleSearchNavigation(this.searchValue);
  }

  private search(): void {
    if (this.searchValue === Constant.EmptyValue) {
      this.searchService.clearQueryParameter();
    } else {
      this.searchService.appendQueryParameter(this.searchValue);
    }
  }
}
