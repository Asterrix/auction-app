import {Injectable} from "@angular/core";
import {ApiService} from "../../../shared/services/api.service";
import {Observable} from "rxjs";
import {Page} from "../../../shared/models/interfaces/page";
import {environment} from "../../../../environments/environment";
import {ApiRoute} from "../../../../environments/api-route";
import {ObservableDataManager} from "../../../shared/models/observable-data-manager";

export interface ItemSummary {
  id: number;
  name: string;
  initialPrice: number;
  itemImages: [
    {
      id: number;
      name: string;
      imageUrl: string;
    }
  ];
}

enum SortItemsAttribute {
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
export class ItemService {
  items$: ObservableDataManager<Page<ItemSummary>> = new ObservableDataManager<Page<ItemSummary>>();

  constructor(private apiService: ApiService) {
  }

  getListOfNewestItems(): Observable<Page<ItemSummary>> {
    return this.getListOfItems(SortItemsAttribute.StartDate, SortItemDirection.DESC);
  }

  getListOfLastChanceItems(): Observable<Page<ItemSummary>> {
    return this.getListOfItems(SortItemsAttribute.EndDate, SortItemDirection.DESC);
  }

  private getListOfItems(sortAttribute: string, sortDirection: string): Observable<Page<ItemSummary>> {
    const getListOfItemsParams = {
      page: 0,
      size: environment.pageSize,
      sort: sortAttribute, sortDirection
    };

    return this.apiService.get<Page<ItemSummary>>({
      path: `${environment.apiUrl}/${ApiRoute.ItemRoute.Items}`,
      options: {params: getListOfItemsParams}
    });
  }
}
