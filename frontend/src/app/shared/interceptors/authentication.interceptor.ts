import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, EMPTY, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Severity} from "../models/errorModel";
import {TokenManager} from "../models/token-manager";
import {AuthenticationService} from "../services/authentication.service";
import {ErrorService} from "../services/error.service";
import {LogoutService} from "../services/logout.service";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private logoutService: LogoutService, private errorService: ErrorService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isAuthenticated: boolean = AuthenticationService.isAuthenticated();
    const isCorrectServer: boolean = request.url.startsWith(environment.apiUrl);

    if (isAuthenticated && isCorrectServer) {
      const token: string = AuthenticationService.retrieveUserToken();
      const normalisedToken: string = TokenManager.createHeaderToken(token);

      const modifiedReq = request.clone({
        setHeaders: {Authorization: `Bearer ${normalisedToken!}`}
      });

      return next.handle(modifiedReq).pipe(
        catchError((err) => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
            this.logoutService.logoutUserTokenInvalidated();
            this.initialiseErrorMessage();
            return EMPTY;
          }
          throw err;
        })
      );
    }

    return next.handle(request);
  }

  private initialiseErrorMessage(): void {
    this.errorService.initialiseError(
      Severity.LOW,
      "Your login session has expired. Please log in again to continue accessing the application as an authenticated user."
    );
  }
}
