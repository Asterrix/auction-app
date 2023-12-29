import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {Page} from "../../../models/interfaces/page";
import {FeaturedItem, ItemAggregate, ItemSummary} from "./item.interface";
import {CreateItemRequest, GetItemsParams} from "./item.type";

enum Endpoint {
  Items = "items",
  Featured = "featured"
}

@Injectable({
  providedIn: "root",
})
export class ItemApi {
  private readonly httpClient: HttpClient = inject(HttpClient);

  public getListOfItems = (params: GetItemsParams): Observable<Page<ItemSummary>> => {
    const httpParams: HttpParams = new HttpParams()
      .set("page", params.pageable.page)
      .set("size", params.pageable.size);

    const body = {
      name: params.name,
      categories: params.categories,
      orderBy: params.orderBy
    };

    return this.httpClient.post<Page<ItemSummary>>(`${environment.apiUrl}/${Endpoint.Items}`, body, {params: httpParams});
  };

  public getFeaturedItem = (): Observable<FeaturedItem> => {
    return this.httpClient.get<FeaturedItem>(`${environment.apiUrl}/${Endpoint.Items}/${Endpoint.Featured}`);
  };

  public getItemById = (itemId: number): Observable<ItemAggregate> => {
    return this.httpClient.get<ItemAggregate>(`${environment.apiUrl}/${Endpoint.Items}/${itemId}`);
  };

  public createItem(body: CreateItemRequest): Observable<HttpResponse<void>> {
    const formData = new FormData();

    for (let i = 0; i < body.images.length; i++) {
      formData.append("images", body.images[i]);
    }

    const item = {
      name: body.name,
      category: body.category,
      subcategory: body.subcategory,
      description: body.description,
      initialPrice: body.initialPrice,
      startTime: body.startTime,
      endTime: body.endTime
    };

    const itemBlob: Blob = new Blob([JSON.stringify(item)], {type: "application/json"});
    formData.append("item", itemBlob, "item.json");

    return this.httpClient.post<void>(`${environment.apiUrl}/${Endpoint.Items}/item`, formData, {observe: "response"});
  }

  public suggestions = (query: string): Observable<ItemSummary[]> => {
    return this.httpClient.get<ItemSummary[]>(`${environment.apiUrl}/${Endpoint.Items}/suggestions`, {params: {query}});
  };
}
