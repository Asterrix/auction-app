import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ObservableDataManager} from "../../../../shared/models/observableDataManager";

export interface Item {
  id: number;
  name: string;
  description: string;
  initialPrice: number;
  timeLeft: string;
  itemImages: [ItemImage];
}

export interface ItemImage {
  id: number;
  name: string;
  imageUrl: string;
}

@Injectable({
  providedIn: "root"
})
export class ItemService {
  item$: ObservableDataManager<Item> = new ObservableDataManager<Item>();
  private readonly endpoint: string = "http://localhost:8080/api/v1/items/";

  constructor(private httpClient: HttpClient) {
  }

  getItem(itemId: number): Observable<Item> {
    return this.httpClient.get<Item>(this.endpoint + itemId);
  }
}
