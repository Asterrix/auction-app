import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, EMPTY, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {TokenManager} from "../models/token-manager";
import {AlertType} from "../services/alert.service";
import {ErrorService} from "../services/error.service";
import {AuthenticationService} from "../services/user/authentication.service";
import {LogoutService} from "../services/user/logout.service";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private logoutService: LogoutService, private errorService: ErrorService, private userService: AuthenticationService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isCorrectServer: boolean = request.url.startsWith(environment.apiUrl);

    if (this.userService.user() && isCorrectServer) {
      const token: string = AuthenticationService.retrieveUserToken();
      const normalisedToken: string = TokenManager.createHeaderToken(token);

      const modifiedReq = request.clone({
        setHeaders: {Authorization: `Bearer ${normalisedToken!}`}
      });

      return next.handle(modifiedReq).pipe(
        catchError((err) => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
            this.logoutService.logoutUserTokenInvalidated();
            this.errorService.setError({
              message: "Your login session has expired. Please log in again to continue accessing the application as an authenticated user.",
              type: AlertType.WarningLevelTwo
            });
            return EMPTY;
          }
          throw err;
        })
      );
    }

    return next.handle(request);
  }
}
