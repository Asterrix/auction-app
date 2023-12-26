export interface Memoization<T> {
  originalState(): T | undefined;

  latestState(): T | undefined;

  saveState(state: T): void;

  clearState(): void;
}
