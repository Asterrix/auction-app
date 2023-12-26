import {Injectable} from "@angular/core";
import {Memoization} from "./memoization.interface";

@Injectable({providedIn: "root"})
export class MemoService<T> implements Memoization<T> {
  private memorisedState: T[] = [];

  public originalState(): T | undefined {
    const length: number = this.memorisedState.length;

    return length < 1 ? undefined : this.memorisedState[0];
  }

  public latestState(): T | undefined {
    const length: number = this.memorisedState.length;

    return length < 1 ? undefined : this.memorisedState[length - 1];
  }

  public saveState(state: T): void {
    this.memorisedState.push(state);
  }

  public clearState(): void {
    this.memorisedState = [];
  }
}
