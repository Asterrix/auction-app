import {computed, inject, Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Filter} from "../../interfaces/filters/filter.interface";
import {SearchCommandService} from "./search-command.service";
import {SearchQueryService} from "./search-query.service";
import {SearchCommand} from "./search.command.interface";
import {SearchQuery} from "./search.query.interface";

@Injectable({
  providedIn: "root"
})
export class SearchService implements SearchCommand, SearchQuery, Filter {
  // Search Suggestions
  public readonly searchSuggestion = computed(() => this.execute(3));
  private readonly searchCommandService = inject(SearchCommandService);

  // Query Param Handling
  private readonly searchQueryService = inject(SearchQueryService);

  // Search
  private searchTermSubject = new BehaviorSubject<string>("");
  public readonly searchTerm = this.searchTermSubject.asObservable();

  public updateSearchTerm = async (searchTerm: string): Promise<void> => {
    this.searchTermSubject.next(searchTerm);
  };

  public clearSearchState(): void {
    this.searchCommandService.clearSearchState();
  }

  public execute(minWordLength: number): string {
    const latestMatchingSearchTerm: string = this.searchCommandService.execute(minWordLength);

    return latestMatchingSearchTerm;
  }

  public saveSearchQuery(state: string): void {
    this.searchCommandService.saveSearchQuery(state);
  }

  public async appendQueryParameter(searchValue: string): Promise<void> {
    return this.searchQueryService.appendQueryParameter(searchValue);
  }

  public async clearSearchParameter(): Promise<void> {
    return this.searchQueryService.clearSearchParameter();
  }

  public async navigateToShopPage(searchValue: string): Promise<void> {
    return this.searchQueryService.navigateToShopPage(searchValue);
  }

  public isFilterApplied = async (): Promise<boolean> => {
    return this.searchTermSubject.getValue() !== "";
  };

  public excludeFilter = async (resetQueryParams: boolean): Promise<void> => {
    await this.updateSearchTerm("");

    if (resetQueryParams) {
      await this.clearSearchParameter();
    }
  };
}
