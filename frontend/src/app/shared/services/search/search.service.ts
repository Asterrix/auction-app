import {computed, inject, Injectable} from "@angular/core";
import {SearchCommandService} from "./search-command.service";
import {SearchQueryService} from "./search-query.service";
import {SearchCommand} from "./search.command.interface";
import {SearchQuery} from "./search.query.interface";

@Injectable({
  providedIn: "root"
})
export class SearchService implements SearchCommand, SearchQuery {
  public readonly searchTerm = computed(() => this.execute(3));
  private readonly searchCommandService = inject(SearchCommandService);
  private readonly searchQueryService = inject(SearchQueryService);

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

  public async resetCategoryAndSubcategoryParams(): Promise<void> {
    return this.searchQueryService.resetCategoryAndSubcategoryParams();
  }
}
