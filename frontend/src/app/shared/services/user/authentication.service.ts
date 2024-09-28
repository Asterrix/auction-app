import {HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {JwtPayload} from "jwt-decode";
import {BehaviorSubject, catchError, Observable} from "rxjs";
import {Constant} from "../../models/enums/constant";
import {Severity} from "../../models/errorModel";
import {TokenManager} from "../../models/token-manager";
import {Api} from "../api.service";
import {ErrorService} from "../error.service";
import Authentication = Api.UserApi.AuthenticationRequest;

export interface UserDetails extends JwtPayload {
  id: number;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private authUser = new BehaviorSubject<Constant | UserDetails>(AuthenticationService.getCurrentUser());

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
    const user: Constant | UserDetails = this.getCurrentUser();
    return user !== Constant.EmptyValue;
  }

  private static getCurrentUser(): Constant | UserDetails {
    const sessionToken: string = TokenManager.retrieveTokenFromSessionStorage();
    const sessionTokenFromStorage: Constant | UserDetails = this.getUserDetailsFromToken(sessionToken);
    if (sessionTokenFromStorage !== Constant.EmptyValue) return sessionTokenFromStorage;


    const localToken: string = TokenManager.retrieveTokenFromLocalStorage();
    const localTokenFromStorage: Constant | UserDetails = this.getUserDetailsFromToken(localToken);
    if (localTokenFromStorage !== Constant.EmptyValue) return localTokenFromStorage;

    return Constant.EmptyValue;
  }

  private static getUserDetailsFromToken(token: string): Constant | UserDetails {
    if (token !== Constant.EmptyValue) {
      return TokenManager.decodeToken(token);
    }
    return Constant.EmptyValue;
  }

  userObservable(): Observable<Constant | UserDetails> {
    return this.authUser.asObservable();
  }

  resetUsername(): void {
    this.resetUserCredentials();
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
            this.resetUserCredentials();
            this.navigateToHomeRoute();
          }
        }
      );
  }

  private navigateToHomeRoute(): void {
    this.router.navigate(["/home"]).then(null);
  }

  private resetUserCredentials(): void {
    this.authUser.next(AuthenticationService.getCurrentUser());
  }
}
