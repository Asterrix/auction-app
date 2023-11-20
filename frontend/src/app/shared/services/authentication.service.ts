import {HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {jwtDecode, JwtPayload} from "jwt-decode";
import {BehaviorSubject, catchError, Observable} from "rxjs";
import {TokenManager} from "../models/token-manager";
import {Api} from "./api.service";
import {ErrorService} from "./error.service";
import Authentication = Api.UserApi.Authentication;

interface UserDetails extends JwtPayload {
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
    return TokenManager.retrieveTokenFromStorage();
  }

  static isAuthenticated(): boolean {
    const token: string | null = TokenManager.retrieveTokenFromStorage();
    return token !== null && token !== "";
  }

  private static getCurrentUsername(): string | null {
    const token: string | null = TokenManager.retrieveTokenFromStorage();

    if (token !== null) {
      const decodedHeader: UserDetails = jwtDecode(token);
      return decodedHeader.firstName + " " + decodedHeader.lastName;
    }

    return null;
  }

  getUsername(): Observable<string | null> {
    return this.authenticatedSubjectUsername.asObservable();
  }

  resetUsername(): void {
    this.setUsername();
  }

  authenticateUser(auth: Required<Authentication>): void {
    this.apiService.authenticateUser(auth)
      .pipe(
        catchError((e) => {
          this.errorService.setErrorMessage(e.error.error.message);
          throw e;
        })
      )
      .subscribe(
        (response: HttpResponse<void>): void => {
          const token: string | null = TokenManager.retrieveToken(response);
          if (token !== null) {
            TokenManager.storeToken(token);
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
