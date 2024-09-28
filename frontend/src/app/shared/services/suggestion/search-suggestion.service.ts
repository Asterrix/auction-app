import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, take} from "rxjs";
import {environment} from "../../../../environments/environment";
import {ItemSummary} from "../api/item/item.interface";


@Injectable({
  providedIn: "root"
})
export class SearchSuggestionService {
  private searchSuggestionSubject = new BehaviorSubject<string | undefined>(undefined);
  public searchSuggestion$ = this.searchSuggestionSubject.asObservable();

  constructor(private readonly httpClient: HttpClient) {
  }

  public suggestions = (query: string): Observable<ItemSummary[]> => {
    return this.httpClient.get<ItemSummary[]>(`${environment.apiUrl}/items/suggestions`, {params: {query}});
  };

  public createSuggestion = (query: string) => {
    this.suggestions(query)
      .pipe(take(1))
      .subscribe((items: ItemSummary[]) => {
        this.searchSuggestionSubject.next(items[0].name ?? undefined);
      });
  };

  public clearSuggestion = () => {
    this.searchSuggestionSubject.next(undefined);
  };
}
