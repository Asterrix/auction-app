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
  private authenticatedSubjectUsername = new BehaviorSubject<string>(AuthenticationService.getCurrentUsername());

  constructor(private router: Router, private apiService: Api.Service, private errorService: ErrorService) {
  }

  static retrieveUserToken(): string {
    const token: string = TokenManager.retrieveTokenFromSessionStorage();
    if (token !== Constant.EmptyValue) {
      return token;
    }

    const localToken: string = TokenManager.retrieveTokenFromLocalStorage();
    if (localToken !== Constant.EmptyValue) {
      return localToken;
    }

    return Constant.EmptyValue;
  }

  static isAuthenticated(): boolean {
    const user: string = this.getCurrentUsername();
    return user !== Constant.EmptyValue;
  }

  private static getCurrentUsername(): string {
    const sessionToken: string = TokenManager.retrieveTokenFromSessionStorage();
    const sessionTokenFromStorage: string = this.getUserDetailsFromToken(sessionToken);
    if (sessionTokenFromStorage !== Constant.EmptyValue) return sessionTokenFromStorage;


    const localToken: string = TokenManager.retrieveTokenFromLocalStorage();
    const localTokenFromStorage: string = this.getUserDetailsFromToken(localToken);
    if (localTokenFromStorage !== Constant.EmptyValue) return localTokenFromStorage;

    return Constant.EmptyValue;
  }

  private static getUserDetailsFromToken(token: string): string {
    if (token !== Constant.EmptyValue) {
      const decodedHeader: UserDetails = TokenManager.decodeToken(token);
      return this.extractUsernameFromDecodedHeader(decodedHeader);
    }
    return Constant.EmptyValue;
  }

  private static extractUsernameFromDecodedHeader(decodedHeader: UserDetails): string {
    return decodedHeader.firstName + " " + decodedHeader.lastName;
  }

  getUsername(): Observable<string> {
    return this.authenticatedSubjectUsername.asObservable();
  }

  resetUsername(): void {
    this.setUsername();
  }

  authenticateUser(auth: Required<Authentication>): void {
    this.apiService.authenticateUser(auth)
      .pipe(
        catchError((e) => {
          this.errorService.initialiseError(Severity.NORMAL, e.error.error.message);
          throw e;
        })
      )
      .subscribe(
        (response: HttpResponse<void>): void => {
          const token: string = TokenManager.retrieveTokenFromHeader(response);
          if (token !== Constant.EmptyValue) {
            TokenManager.determineLocationToStoreToken(auth.rememberMe, token);
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