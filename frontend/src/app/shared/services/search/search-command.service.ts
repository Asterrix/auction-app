import {Injectable, signal} from "@angular/core";
import {SearchCommand} from "./search.command.interface";

@Injectable({
  providedIn: "root"
})
export class SearchCommandService implements SearchCommand {
  private state = signal<string[]>([]);

  public execute(minWordLength: number): string {
    const matchingState: string = this.findLatestMatchingState(minWordLength);

    return matchingState;
  }

  public saveSearchQuery(state: string): void {
    this.state.update((prevState) => [...prevState, state]);
  }

  public clearSearchState(): void {
    this.state.set([]);
  }

  private findLatestMatchingState(minWordLength: number): string {
    const length = this.state().length;
    let result: string = "";

    let i = length - 1;
    while (i > 0) {
      if (this.state()[i].length >= minWordLength) {
        result = this.state()[i];
        break;
      }
      i--;
    }

    return result;
  }
}
