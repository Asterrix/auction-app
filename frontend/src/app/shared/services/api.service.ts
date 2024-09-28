import {HttpClient, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

export namespace Api {
  import BidRequest = Api.BidApi.BidRequest;
  import UserBiddingInfo = Api.BidApi.UserBiddingInfo;
  import Category = Api.CategoryApi.Category;
  import Authentication = Api.UserApi.AuthenticationRequest;
  import Register = Api.UserApi.RegisterRequest;
  import UserItems = Api.UserApi.UserItem;


  @Injectable({providedIn: "root"})
  export class Service {
    constructor(private httpClient: HttpClient) {
    }

    getAllCategories(): Observable<Array<Category>> {
      return CategoryApi.GetMethods.getAllCategories(this.httpClient);
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

    bidOnItem(req: Required<BidRequest>): Observable<HttpResponse<void>> {
      return BidApi.PostMethod.makeAnOffer(this.httpClient, req);
    }

    getAllUserBiddingInformation(): Observable<Array<UserBiddingInfo>> {
      return BidApi.GetMethod.getAllUserBidInformation(this.httpClient);
    }

    getUserItems(): Observable<UserItems[]> {
      return UserApi.GetMethod.getUserItems(this.httpClient);
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
      Register = "register",
      Users = "users"
    }

    export type UserItem = {
      item: {
        id: number;
        portrait: string;
        name: string;
      }
      timeRemaining: string;
      numberOfBids: number;
      highestBid: number;
      finished: boolean;
    }

    export namespace GetMethod {
      export function getUserItems(httpClient: HttpClient): Observable<UserItem[]> {
        return httpClient.get<UserItem[]>(`${environment.apiUrl}/${Endpoint.Users}/items`);
      }
    }

    export namespace PostMethods {
      export function authenticate(httpClient: HttpClient, auth: Required<AuthenticationRequest>): Observable<HttpResponse<void>> {
        const body = {
          email: auth.email,
          password: auth.password,
          rememberMe: auth.rememberMe
        };

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

  export namespace BidApi {
    export interface BidRequest {
      itemId: number,
      amount: number
    }

    export interface UserBiddingInfo {
      item: {
        id: number;
        portrait: string;
        name: string;
      };
      timeRemaining: string;
      biddingOffer: string;
      numberOfBids: number;
      highestBid: string;
    }

    export enum Endpoint {
      Bids = "bids"
    }

    export namespace GetMethod {
      export function getAllUserBidInformation(httpClient: HttpClient): Observable<Array<UserBiddingInfo>> {

        return httpClient.get<Array<UserBiddingInfo>>(`${environment.apiUrl}/${Endpoint.Bids}`);
      }
    }

    export namespace PostMethod {
      export function makeAnOffer(httpClient: HttpClient, req: Required<BidRequest>): Observable<HttpResponse<void>> {
        const body = {
          itemId: req.itemId,
          amount: req.amount
        };

        return httpClient.post<void>(`${environment.apiUrl}/${Endpoint.Bids}`, body, {observe: "response"});
      }
    }
  }
}
