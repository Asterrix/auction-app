import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../../../../shared/models/interfaces/page";

export interface ItemSummary {
  id: number;
  name: string;
  initialPrice: number;
  portrait: {
    id: number;
    name: string;
    imageUrl: string;
  }
}

enum SortItemsAttribute {
  Id = "id",
  StartDate = "startDate",
  EndDate = "endDate"
}

enum SortItemDirection {
  ASC = "ASC",
  DESC = "DESC"
}

@Injectable({
  providedIn: "root"
})
export class HomeItemsService {
  private readonly _pageNumber: number = 0;
  private readonly _pageSize: number = 8;
  private readonly _endpoint: string = "http://localhost:8080/api/v1/items";

  constructor(private httpClient: HttpClient) {
  }

  public getListOfNewestItems(): Observable<Page<ItemSummary>> {
    return this.getListOfItems(SortItemsAttribute.StartDate, SortItemDirection.DESC);
  }

  public getListOfLastChanceItems(): Observable<Page<ItemSummary>> {
    return this.getListOfItems(SortItemsAttribute.EndDate, SortItemDirection.DESC);
  }

  private getListOfItems(sortByAttribute: string, sortDirection: string): Observable<Page<ItemSummary>> {

    const params = {
      pageNumber: this._pageNumber,
      pageSize: this._pageSize,
      sortByAttribute: sortByAttribute,
      sortDirection: sortDirection
    };

    return this.httpClient.get<Page<ItemSummary>>(this._endpoint, {params});
  }
}
