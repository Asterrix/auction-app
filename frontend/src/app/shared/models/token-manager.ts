import {HttpResponse} from "@angular/common/http";
import {jwtDecode} from "jwt-decode";
import {UserDetails} from "../services/authentication.service";

enum Token {
  Key = "Token",
  Header = "Authorization"
}

export class TokenManager {
  static retrieveTokenFromHeader(httpResponse: HttpResponse<void>): string | null {
    return httpResponse.headers.get(Token.Header);
  }

  static retrieveTokenFromSessionStorage(): string | null {
    return window.sessionStorage.getItem(Token.Key);
  }

  static retrieveTokenFromLocalStorage(): string | null {
    return window.localStorage.getItem(Token.Key);
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
}
