export interface SearchCommand {
  saveSearchQuery(state: string): void;
  execute(minWordLength: number): string;
  clearSearchState(): void;
}
