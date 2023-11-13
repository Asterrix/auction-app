import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {Api} from "./api.service";
import UserInput = Api.SearchSuggestionApi.Interfaces.UserInput;

@Injectable({
  providedIn: "root"
})
export class SearchService {
  private searchTermSubject = new BehaviorSubject<string>("");
  private suggestionSubject = new BehaviorSubject<string>("");
  private displayDidYouMeanSubject = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private apiService: Api.Service) {
  }

  getDisplay(): Observable<boolean> {
    return this.displayDidYouMeanSubject.asObservable();
  }

  getSuggestion(): Observable<string> {
    return this.suggestionSubject.asObservable();
  }

  getSearchTerm(): Observable<string> {
    return this.searchTermSubject.asObservable();
  }

  handleDisplay(): void {
    if (this.searchTermSubject.getValue() !== this.suggestionSubject.getValue() && this.suggestionSubject.getValue().length != 0) {
      this.displayDidYouMeanSubject.next(true);
    }
  }

  setSearchTerm(input: string): void {
    this.searchTermSubject.next(input);
  }

  hideDidYouMean(): void {
    this.displayDidYouMeanSubject.next(false);
  }

  handleSearchNavigation(searchValue: string): void {
    this.router.navigate(["/shop"], {
      queryParams: {itemName: searchValue},
    }).then(null);
  }

  resetSuggestion(): void {
    this.suggestionSubject.next("");
  }

  getSearchSuggestion() {
    const userInput: Required<UserInput> = {searchInput: this.searchTermSubject.getValue()};
    this.apiService.getSearchSuggestion(userInput).subscribe(value => {
      this.suggestionSubject.next(value.searchSuggestion);
    });
  }

  handleSearchSuggestionNavigation(): void {
    this.router.navigate(["/shop"], {
      queryParams: {itemName: this.suggestionSubject.getValue()},
    }).then(null);

    this.searchTermSubject.next(this.suggestionSubject.getValue());
    this.hideDidYouMean();
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
