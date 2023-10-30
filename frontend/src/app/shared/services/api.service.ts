import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../models/interfaces/page";
import {environment} from "../../../environments/environment";
import {FeaturedItem, Item, ItemSummary, SortItemAttribute} from "./item.service";
import {SortDirection} from "../models/enums/sort-direction";

enum ItemRouteEndpoint {
  Items = "items",
  Featured = "featured"
}

@Injectable({
  providedIn: "root"
})
export class ApiService {

  constructor(private httpClient: HttpClient) {
  }

  /* Item --> */
  getListOfNewestItems(): Observable<Page<ItemSummary>> {
    return this.getListOfItems(SortItemAttribute.StartDate, SortDirection.DESC);
  }

  getListOfLastChanceItems(): Observable<Page<ItemSummary>> {
    return this.getListOfItems(SortItemAttribute.EndDate, SortDirection.DESC);
  }

  getFeaturedItem(): Observable<FeaturedItem> {
    return this.httpClient.get<FeaturedItem>(`${environment.apiUrl}/${ItemRouteEndpoint.Items}/${ItemRouteEndpoint.Featured}`);
  }

  getItem(itemId: number): Observable<Item> {
    return this.httpClient.get<Item>(`${environment.apiUrl}/${ItemRouteEndpoint.Items}/${itemId}`);
  }

  private getListOfItems(sortAttribute: string, sortDirection: string): Observable<Page<ItemSummary>> {
    const getListOfItemsParams = {
      page: 0,
      size: 8,
      sort: `${sortAttribute},${sortDirection}`
    };

    return this.httpClient.get<Page<ItemSummary>>(`${environment.apiUrl}/${ItemRouteEndpoint.Items}`, {params: getListOfItemsParams});
  }

  /* <-- Item */
}
