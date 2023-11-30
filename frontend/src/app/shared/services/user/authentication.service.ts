import {HttpResponse} from "@angular/common/http";
import {computed, Injectable, signal} from "@angular/core";
import {Router} from "@angular/router";
import {JwtPayload} from "jwt-decode";
import {catchError} from "rxjs";
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
  private userSignal = signal<UserDetails | undefined>(this.getCurrentUser());
  user = computed(this.userSignal);

  constructor(private router: Router, private apiService: Api.Service, private errorService: ErrorService) {
  }

  static retrieveUserToken(): string {
    return TokenManager.retrieveTokenFromLocalStorage();
  }

  isAuthenticated(): boolean {
    const user: UserDetails | undefined = this.getCurrentUser();
    return user !== undefined;
  }

  public getCurrentUser(): UserDetails | undefined {
    const localToken: string = TokenManager.retrieveTokenFromLocalStorage();
    return this.getUserDetailsFromToken(localToken);
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

  private getUserDetailsFromToken(token: string): UserDetails | undefined {
    if (token) {
      return TokenManager.decodeToken(token);
    }
    return undefined;
  }

  private navigateToHomeRoute(): void {
    this.router.navigate(["/home"]).then(null);
  }

  private resetUserCredentials(): void {
    this.userSignal.set(this.getCurrentUser());
  }
}
