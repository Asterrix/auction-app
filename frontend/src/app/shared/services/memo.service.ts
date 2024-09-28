import {Injectable} from "@angular/core";

interface Memento<T> {
  originalState(): T | undefined;

  latestState(): T | undefined;

  saveState(state: T): void;

  clearState(): void;
}

@Injectable({providedIn: "root"})
export class MemoService<T> implements Memento<T> {
  private memorisedState: T[] = [];

  public originalState(): T | undefined {
    const length: number = this.memorisedState.length;

    if (length < 1) {
      return undefined;
    }

    return this.memorisedState[0];
  }

  public latestState(): T | undefined {
    const length: number = this.memorisedState.length;

    if (length < 1) {
      return undefined;
    }

    return this.memorisedState[length - 1];
  }

  public saveState(state: T): void {
    this.memorisedState.push(state);
  }

  public clearState(): void {
    this.memorisedState = [];
  }
}
