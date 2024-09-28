import {HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {JwtPayload} from "jwt-decode";
import {BehaviorSubject, catchError, Observable} from "rxjs";
import {Constant} from "../../models/enums/constant";
import {TokenManager} from "../../models/token-manager";
import {AlertType} from "../alert.service";
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
  private authUser = new BehaviorSubject<UserDetails | undefined>(AuthenticationService.getCurrentUser());

  constructor(private router: Router, private apiService: Api.Service, private errorService: ErrorService) {
  }

  static retrieveUserToken(): string {
    return TokenManager.retrieveTokenFromLocalStorage();
  }

  static isAuthenticated(): boolean {
    const user: UserDetails | undefined = this.getCurrentUser();
    return user !== undefined;
  }

  public static getCurrentUser(): UserDetails | undefined {
    const localToken: string = TokenManager.retrieveTokenFromLocalStorage();
    return this.getUserDetailsFromToken(localToken);
  }

  private static getUserDetailsFromToken(token: string): UserDetails | undefined {
    if (token) {
      return TokenManager.decodeToken(token);
    }
    return undefined;
  }

  userObservable(): Observable<UserDetails | undefined> {
    return this.authUser.asObservable();
  }

  resetUsername(): void {
    this.resetUserCredentials();
  }

  authenticateUser(auth: Required<Authentication>): void {
    this.apiService.authenticateUser(auth)
      .pipe(
        catchError((e) => {
          this.errorService.setError({message: e.error.message, type: AlertType.WarningLevelOne});
          throw e;
        })
      )
      .subscribe(
        (response: HttpResponse<void>): void => {
          const token: string = TokenManager.retrieveTokenFromHeader(response);
          if (token !== Constant.EmptyValue) {
            TokenManager.storeTokenToLocalStorage(token);
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
