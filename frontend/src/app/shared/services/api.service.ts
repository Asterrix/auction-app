import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../models/interfaces/page";
import {environment} from "../../../environments/environment";
import {ApiRoute} from "../../../environments/api-route";
import {
  FeaturedItem,
  ItemSummary,
  SortItemAttribute,
  SortItemDirection
} from "../../features/home/services/item.service";

@Injectable({
  providedIn: "root"
})
export class ApiService {

  constructor(private httpClient: HttpClient) {
  }

  /* Item --> */
  getListOfNewestItems(): Observable<Page<ItemSummary>> {
    return this.getListOfItems(SortItemAttribute.StartDate, SortItemDirection.DESC);
  }

  getListOfLastChanceItems(): Observable<Page<ItemSummary>> {
    return this.getListOfItems(SortItemAttribute.EndDate, SortItemDirection.DESC);
  }

  getFeaturedItem(): Observable<FeaturedItem> {
    return this.httpClient.get<FeaturedItem>(`${environment.apiUrl}/${ApiRoute.ItemRoute.Items}/${ApiRoute.ItemRoute.Featured}`);
  }

  private getListOfItems(sortAttribute: string, sortDirection: string): Observable<Page<ItemSummary>> {
    const getListOfItemsParams = {
      page: 0,
      size: 8,
      sort: sortAttribute, sortDirection
    };

    return this.httpClient.get<Page<ItemSummary>>(`${environment.apiUrl}/${ApiRoute.ItemRoute.Items}`, {params: getListOfItemsParams});
  }

  /* <-- Item */
}
