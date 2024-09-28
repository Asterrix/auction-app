import {HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {JwtPayload} from "jwt-decode";
import {BehaviorSubject, catchError, Observable} from "rxjs";
import {Constant} from "../models/enums/constant";
import {Severity} from "../models/errorModel";
import {TokenManager} from "../models/token-manager";
import {Api} from "./api.service";
import {ErrorService} from "./error.service";
import Authentication = Api.UserApi.Authentication;

export interface UserDetails extends JwtPayload {
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private authenticatedSubjectUsername = new BehaviorSubject<string | null>(AuthenticationService.getCurrentUsername());

  constructor(private router: Router, private apiService: Api.Service, private errorService: ErrorService) {
  }

  static retrieveUserToken(): string | null {
    const token: string | null = TokenManager.retrieveTokenFromSessionStorage();
    if (token !== null && token !== Constant.EmptyValue) {
      return token;
    }

    const localToken: string | null = TokenManager.retrieveTokenFromLocalStorage();
    if (localToken !== null && localToken !== Constant.EmptyValue) {
      return localToken;
    }

    return null;
  }

  static isAuthenticated(): boolean {
    const user: string | null = this.getCurrentUsername();
    return user !== null && user !== Constant.EmptyValue;
  }

  private static getCurrentUsername(): string | null {
    const sessionToken: string | null = TokenManager.retrieveTokenFromSessionStorage();
    const sessionTokenFromStorage: string | null = this.getTokenFromStorage(sessionToken);
    if (sessionTokenFromStorage !== null) return sessionTokenFromStorage;


    const localToken: string | null = TokenManager.retrieveTokenFromLocalStorage();
    const localTokenFromStorage: string | null = this.getTokenFromStorage(localToken);
    if (localTokenFromStorage !== null) return localTokenFromStorage;

    return null;
  }

  private static getTokenFromStorage(token: string | null): null | string {
    if (token !== null && token !== Constant.EmptyValue) {
      const decodedHeader: UserDetails = TokenManager.decodeToken(token);
      return this.extractUsernameFromDecodedHeader(decodedHeader);
    }
    return null;
  }

  private static extractUsernameFromDecodedHeader(decodedHeader: UserDetails): string {
    return decodedHeader.firstName + " " + decodedHeader.lastName;
  }

  getUsername(): Observable<string | null> {
    return this.authenticatedSubjectUsername.asObservable();
  }

  resetUsername(): void {
    this.setUsername();
  }

  authenticateUser(auth: Required<Authentication>, rememberMe: boolean): void {
    this.apiService.authenticateUser(auth)
      .pipe(
        catchError((e) => {
          this.errorService.initialiseError(Severity.NORMAL, e.error.error.message);
          throw e;
        })
      )
      .subscribe(
        (response: HttpResponse<void>): void => {
          const token: string | null = TokenManager.retrieveTokenFromHeader(response);
          if (token !== null) {
            TokenManager.determineLocationToStoreToken(rememberMe, token);
            this.setUsername();
            this.navigateToHomeRoute();
          }
        }
      );
  }


  private navigateToHomeRoute(): void {
    this.router.navigate(["/home"]).then(null);
  }

  private setUsername(): void {
    this.authenticatedSubjectUsername.next(AuthenticationService.getCurrentUsername());
  }
}
