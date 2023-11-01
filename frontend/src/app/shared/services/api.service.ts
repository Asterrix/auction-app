import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Page} from "../models/interfaces/page";


export namespace Api {
  import Category = Api.CategoryApi.Category;
  import FeaturedItem = Api.ItemApi.Interfaces.FeaturedItem;
  import Item = Api.ItemApi.Interfaces.Item;
  import ItemSummary = Api.ItemApi.Interfaces.ItemSummary;

  @Injectable({providedIn: "root"})
  export class Service {
    constructor(private httpClient: HttpClient) {
    }

    getAllCategories(): Observable<Array<Category>> {
      return CategoryApi.GetMethods.getAllCategories(this.httpClient);
    }

    getListOfNewestArrivals(): Observable<Page<ItemSummary>> {
      return ItemApi.GetMethods.getListOfNewestItems(this.httpClient);
    }

    getListOfLastChanceItems(): Observable<Page<ItemSummary>> {
      return ItemApi.GetMethods.getListOfLastChanceItems(this.httpClient);
    }

    getFeaturedItem(): Observable<FeaturedItem> {
      return ItemApi.GetMethods.getFeaturedItem(this.httpClient);
    }

    getItemById(itemId: number): Observable<Item> {
      return ItemApi.GetMethods.getItemById(this.httpClient, itemId);
    }
  }

  export namespace CategoryApi {

    export interface Category {
      id: number;
      name: string;
    }

    enum Endpoint {
      Categories = "categories"
    }

    export namespace GetMethods {
      export function getAllCategories(httpClient: HttpClient): Observable<Array<Category>> {
        return httpClient.get<Array<Category>>(`${environment.apiUrl}/${Endpoint.Categories}`);
      }
    }
  }

  export namespace ItemApi {

    export namespace Interfaces {
      interface ItemBaseProperties {
        id: number;
        name: string;
        initialPrice: number;
      }

      export interface FeaturedItem extends ItemBaseProperties {
        description: string;
        thumbnail: ItemImage;
      }

      export interface ItemSummary extends ItemBaseProperties {
        thumbnail: ItemImage;
      }

      export interface Item extends ItemBaseProperties {
        description: string;
        timeLeft: string;
        images: Array<ItemImage>;
      }

      export interface ItemImage {
        id: number;
        name: string;
        imageUrl: string;
      }
    }

    enum Endpoint {
      Items = "items",
      Featured = "featured"
    }

    enum SortBy {
      StartDate = "startDate",
      EndDate = "endDate"
    }

    enum SortByDirection {
      ASC = "ASC",
      DESC = "DESC"
    }

    export namespace GetMethods {
      import FeaturedItem = Api.ItemApi.Interfaces.FeaturedItem;
      import Item = Api.ItemApi.Interfaces.Item;
      import ItemSummary = Api.ItemApi.Interfaces.ItemSummary;

      export function getListOfNewestItems(httpClient: HttpClient): Observable<Page<ItemSummary>> {
        const pageSize: number = 8;

        return getListOfItems(httpClient, SortBy.StartDate, SortByDirection.DESC, pageSize);
      }

      export function getListOfLastChanceItems(httpClient: HttpClient): Observable<Page<ItemSummary>> {
        const pageSize: number = 8;

        return getListOfItems(httpClient, SortBy.EndDate, SortByDirection.DESC, pageSize);
      }

      export function getFeaturedItem(httpClient: HttpClient): Observable<FeaturedItem> {
        return httpClient.get<FeaturedItem>(`${environment.apiUrl}/${Endpoint.Items}/${Endpoint.Featured}`);
      }

      export function getItemById(httpClient: HttpClient, itemId: number): Observable<Item> {
        return httpClient.get<Item>(`${environment.apiUrl}/${Endpoint.Items}/${itemId}`);
      }

      function getListOfItems(httpClient: HttpClient,
                              sortAttribute: string,
                              sortDirection: string,
                              pageSize: number = 9,
                              pageNumber: number = 0): Observable<Page<ItemSummary>> {
        const getListOfItemsParams: { size: number; page: number; sort: string } = {
          size: pageSize,
          page: pageNumber,
          sort: `${sortAttribute},${sortDirection}`
        };

        return httpClient.get<Page<ItemSummary>>(`${environment.apiUrl}/${Endpoint.Items}`, {params: getListOfItemsParams});
      }
    }
  }
}
