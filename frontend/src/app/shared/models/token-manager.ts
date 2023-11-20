import {HttpResponse} from "@angular/common/http";

enum Token {
  Key = "Token",
  Header = "Authorization"
}

export class TokenManager {
  static retrieveToken(httpResponse: HttpResponse<void>): string | null {
    return httpResponse.headers.get(Token.Header);
  }

  static retrieveTokenFromStorage(): string | null {
    return window.sessionStorage.getItem(Token.Key);
  }

  static storeToken(token: string): void {
    window.sessionStorage.setItem(Token.Key, JSON.stringify(token));
  }

  static removeToken(): void {
    window.sessionStorage.removeItem(Token.Key);
  }
}
