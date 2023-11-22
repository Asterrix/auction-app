import {HttpResponse} from "@angular/common/http";
import {jwtDecode} from "jwt-decode";
import {UserDetails} from "../services/user/authentication.service";
import {Constant} from "./enums/constant";

export enum Token {
  Key = "Token",
  Header = "Authorization"
}

export class TokenManager {
  static retrieveTokenFromHeader(httpResponse: HttpResponse<void>): string {
    return httpResponse.headers.get(Token.Header) ?? Constant.EmptyValue;
  }

  static retrieveTokenFromSessionStorage(): string {
    return window.sessionStorage.getItem(Token.Key) ?? Constant.EmptyValue;
  }

  static retrieveTokenFromLocalStorage(): string {
    return window.localStorage.getItem(Token.Key) ?? Constant.EmptyValue;
  }

  static storeTokenToSessionStorage(token: string): void {
    window.sessionStorage.setItem(Token.Key, JSON.stringify(token));
  }

  static storeTokenToLocalStorage(token: string): void {
    window.localStorage.setItem(Token.Key, JSON.stringify(token));
  }

  static removeToken(): void {
    window.sessionStorage.removeItem(Token.Key);
    window.localStorage.removeItem(Token.Key);
  }

  static decodeToken(sessionToken: string): UserDetails {
    return jwtDecode(sessionToken);
  }

  static determineLocationToStoreToken(rememberMe: boolean, token: string): void {
    if (rememberMe) TokenManager.storeTokenToLocalStorage(token);
    else TokenManager.storeTokenToSessionStorage(token);
  }

  // Remove `"` characters from the token
  static createHeaderToken(token: string): string {
    return token.substring(1, token.length - 1);
  }
}
