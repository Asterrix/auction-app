import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, OnInit} from "@angular/core";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
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

  constructor(private formBuilder: FormBuilder, private searchService: SearchService) {
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
