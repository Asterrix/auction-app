import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class SearchService {

  constructor(private router: Router) {
  }

  handleSearchNavigation(searchValue: string): void {
    this.router.navigate(["/shop"], {
      queryParams: {itemName: searchValue},
    }).then(null);
  }

  appendQueryParameter(searchValue: string): void {
    this.router.navigate([], {
      queryParams: {itemName: searchValue},
      queryParamsHandling: "merge",
    }).then(null);
  }

  clearQueryParameter(): void {
    this.router.navigate([], {
      queryParams: {itemName: null},
      queryParamsHandling: "merge",
    }).then(null);
  }

  resetCategoryAndSubcategoryParams() {
    this.router.navigate([], {
      queryParams: {
        category: null,
        subcategory: null
      }, queryParamsHandling: "merge"
    }).then(null);
  }
}
