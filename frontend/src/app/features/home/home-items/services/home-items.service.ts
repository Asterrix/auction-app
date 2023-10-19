import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../../../../shared/models/interfaces/page";

export interface Item {
  id: number;
  name: string;
  description: string;
  initialPrice: number;
  startDate: string;
  endDate: string;
  itemImages: [
    {
      id: number;
      name: string;
      imageUrl: string;
    }
  ];
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
  private pageNumber: number = 0;
  private pageSize: number = 8;
  private endpoint: string = "http://localhost:8080/api/v1/items";

  constructor(private httpClient: HttpClient) {
  }

  public getListOfNewestItems(pageNumber: number): Observable<Page<Item>> {
    return this.getListOfItems(pageNumber, this.pageSize, SortItemsAttribute.StartDate, SortItemDirection.DESC);
  }

  public getListOfLastChanceItems(pageNumber: number): Observable<Page<Item>> {
    return this.getListOfItems(pageNumber, this.pageSize, SortItemsAttribute.EndDate, SortItemDirection.DESC);
  }

  private getListOfItems(pageNumber: number = this.pageNumber,
                         pageSize: number = this.pageSize,
                         sortBy: string = SortItemsAttribute.Id,
                         sortDirection: string = SortItemDirection.ASC): Observable<Page<Item>> {

    const params = {pageNumber: pageNumber, pageSize: pageSize, sortBy: sortBy, sortDirection: sortDirection};

    return this.httpClient.get<Page<Item>>(this.endpoint, {params});
  }
}
