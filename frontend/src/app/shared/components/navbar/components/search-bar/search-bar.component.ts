import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, OnInit} from "@angular/core";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {debounceTime} from "rxjs";
import {distinctUntilChanged} from "rxjs/operators";
import {Constant} from "../../../../models/enums/constant";

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

  constructor(private formBuilder: FormBuilder, private router: Router) {
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

  search() {
    // Clear query parameter if the input is empty
    if (this.searchValue === Constant.EmptyValue) {
      this.clearQueryParameter();
    } else {
      this.appendQueryParameter();
    }
  }

  handleSearchNavigation(): void {
    this.router.navigate(["/shop"], {
      queryParams: {itemName: this.searchValue},
    }).then(null);
  }

  private appendQueryParameter(): void {
    this.router.navigate([], {
      queryParams: {itemName: this.searchValue},
      queryParamsHandling: "merge",
    }).then(null);
  }

  private clearQueryParameter(): void {
    this.router.navigate([], {
      queryParams: {itemName: null},
      queryParamsHandling: "merge",
    }).then(null);
  }
}
