import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Page} from "../models/interfaces/page";
import {IPagination} from "../models/pagination";

export namespace Api {
  import Category = Api.CategoryApi.Category;
  import ItemParams = Api.ItemApi.GetMethods.ItemParams;
  import FeaturedItem = Api.ItemApi.Interfaces.FeaturedItem;
  import ItemAggregate = Api.ItemApi.Interfaces.ItemAggregate;
  import ItemSummary = Api.ItemApi.Interfaces.ItemSummary;
  import Authentication = Api.UserApi.AuthenticationRequest;
  import Register = Api.UserApi.RegisterRequest;


  @Injectable({providedIn: "root"})
  export class Service {
    constructor(private httpClient: HttpClient) {
    }

    getAllCategories(): Observable<Array<Category>> {
      return CategoryApi.GetMethods.getAllCategories(this.httpClient);
    }

    getListOfNewestArrivals(pagination: IPagination): Observable<Page<ItemSummary>> {
      return ItemApi.GetMethods.getListOfNewestItems(this.httpClient, pagination);
    }

    getListOfLastChanceItems(pagination: IPagination): Observable<Page<ItemSummary>> {
      return ItemApi.GetMethods.getListOfLastChanceItems(this.httpClient, pagination);
    }

    getFeaturedItem(): Observable<FeaturedItem> {
      return ItemApi.GetMethods.getFeaturedItem(this.httpClient);
    }

    getItemById(itemId: number): Observable<ItemAggregate> {
      return ItemApi.GetMethods.getItemById(this.httpClient, itemId);
    }

    getListOfAllItems(filter: Partial<ItemParams>, pagination: Required<IPagination>): Observable<Page<ItemSummary>> {
      return ItemApi.GetMethods.getListOfItems(this.httpClient, filter, pagination);
    }

    authenticateUser(auth: Required<Authentication>) {
      return UserApi.PostMethods.authenticate(this.httpClient, auth);
    }

    logoutUser(): Observable<HttpResponse<void>> {
      return UserApi.PostMethods.logout(this.httpClient);
    }

    registerUser(auth: Required<Register>): Observable<HttpResponse<boolean>> {
      return UserApi.PostMethods.register(this.httpClient, auth);
    }
  }


  export namespace UserApi {
    export interface AuthenticationRequest {
      email: string;
      password: string;
      rememberMe: boolean;
    }

    export interface RegisterRequest {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }

    enum Endpoint {
      Authentication = "authentication",
      Logout = "logout",
      Register = "register"
    }

    export namespace PostMethods {
      export function authenticate(httpClient: HttpClient, auth: Required<AuthenticationRequest>): Observable<HttpResponse<void>> {
        const body = {email: auth.email, password: auth.password};
        return httpClient.post<void>(`${environment.apiUrl}/${Endpoint.Authentication}`, body, {observe: "response"});
      }

      export function logout(httpClient: HttpClient): Observable<HttpResponse<void>> {
        return httpClient.post<void>(`${environment.apiUrl}/${Endpoint.Authentication}/${Endpoint.Logout}`, null, {observe: "response"});
      }

      export function register(httpClient: HttpClient, userDetails: Required<RegisterRequest>): Observable<HttpResponse<boolean>> {
        const body: RegisterRequest = {
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          email: userDetails.email,
          password: userDetails.password
        };
        return httpClient.post<boolean>(`${environment.apiUrl}/${Endpoint.Register}`, body, {observe: "response"});
      }
    }
  }

  export namespace CategoryApi {

    export interface Category {
      id: number;
      name: string;
      subcategories: Array<Subcategory>;
    }

    export interface Subcategory {
      id: number;
      name: string;
      numberOfItems: number;
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

      export interface BiddingInformation {
        highestBid: number;
        totalNumberOfBids: number;
      }

      export interface ItemAggregate {
        item: Item;
        biddingInformation: BiddingInformation;
      }
    }

    enum Endpoint {
      Items = "items",
      Featured = "featured"
    }

    export namespace HelperMethods {
      export function extractItemParameters(params: Partial<ItemParams>, param: HttpParams): HttpParams {
        for (const [key, value] of Object.entries(params)) {
          if (value !== undefined) {
            param = param.set(key, value);
          }
        }
        return param;
      }

      export function extractPagination(pagination: Required<IPagination>, param: HttpParams): HttpParams {
        for (const [key, value] of Object.entries(pagination)) {
          param = param.set(key, value);
        }
        return param;
      }
    }

    export namespace GetMethods {
      import extractParameters = Api.ItemApi.HelperMethods.extractItemParameters;
      import extractPagination = Api.ItemApi.HelperMethods.extractPagination;
      import FeaturedItem = Api.ItemApi.Interfaces.FeaturedItem;
      import ItemSummary = Api.ItemApi.Interfaces.ItemSummary;

      export interface ItemParams {
        sort: string;
        category: string;
        subcategory: string;
        itemName: string;
      }

      enum SortBy {
        StartDate = "startDate",
        EndDate = "endDate"
      }

      enum SortByDirection {
        ASC = "ASC",
        DESC = "DESC"
      }

      function getParams(params: Partial<ItemParams>, pagination: Required<IPagination>): HttpParams {
        let param: HttpParams = new HttpParams();

        param = extractParameters(params, param);
        param = extractPagination(pagination, param);

        return param;
      }

      export function getListOfNewestItems(httpClient: HttpClient, pagination: IPagination): Observable<Page<ItemSummary>> {

        const params: Partial<ItemParams> = {
          sort: `${SortBy.StartDate},${SortByDirection.DESC}`
        };

        return getListOfItems(httpClient, params, pagination);
      }

      export function getListOfLastChanceItems(httpClient: HttpClient, pagination: IPagination): Observable<Page<ItemSummary>> {

        const params: Partial<ItemParams> = {
          sort: `${SortBy.EndDate},${SortByDirection.DESC}`
        };

        return getListOfItems(httpClient, params, pagination);
      }

      export function getFeaturedItem(httpClient: HttpClient): Observable<FeaturedItem> {
        return httpClient.get<FeaturedItem>(`${environment.apiUrl}/${Endpoint.Items}/${Endpoint.Featured}`);
      }

      export function getItemById(httpClient: HttpClient, itemId: number): Observable<ItemAggregate> {
        return httpClient.get<ItemAggregate>(`${environment.apiUrl}/${Endpoint.Items}/${itemId}`);
      }

      export function getListOfItems(httpClient: HttpClient, params: Partial<ItemParams>, pagination: Required<IPagination>): Observable<Page<ItemSummary>> {
        return httpClient.get<Page<ItemSummary>>(`${environment.apiUrl}/${Endpoint.Items}`, {params: getParams(params, pagination)});
      }
    }
  }
}
