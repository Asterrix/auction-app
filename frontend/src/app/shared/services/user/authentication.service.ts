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
  private authUser = new BehaviorSubject<Constant | UserDetails>(AuthenticationService.getCurrentUser());

  constructor(private router: Router, private apiService: Api.Service, private errorService: ErrorService) {
  }

  static retrieveUserToken(): string {
    const token: string = TokenManager.retrieveTokenFromLocalStorage();

    return token !== Constant.EmptyValue ? token : Constant.EmptyValue;
  }

  static isAuthenticated(): boolean {
    const user: Constant | UserDetails = this.getCurrentUser();
    return user !== Constant.EmptyValue;
  }

  private static getCurrentUser(): Constant | UserDetails {
    const localToken: string = TokenManager.retrieveTokenFromLocalStorage();
    const userDetails: Constant | UserDetails = this.getUserDetailsFromToken(localToken);

    return userDetails !== Constant.EmptyValue ? userDetails : Constant.EmptyValue;
  }

  private static getUserDetailsFromToken(token: string): Constant | UserDetails {
    return token !== Constant.EmptyValue ? TokenManager.decodeToken(token) : Constant.EmptyValue;
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
