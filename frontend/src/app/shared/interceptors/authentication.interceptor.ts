import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {AuthenticationService} from "../services/authentication.service";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isAuthenticated: boolean = AuthenticationService.isAuthenticated();
    const isCorrectServer: boolean = request.url.startsWith(environment.apiUrl);

    if (isAuthenticated && isCorrectServer) {
      const token = AuthenticationService.retrieveUserToken();
      const normalisedToken = token?.substring(1, token?.length - 1); // Remove `"` characters

      const modifiedReq = request.clone({
        setHeaders: {Authorization: `Bearer ${normalisedToken!}`}
      });

      return next.handle(modifiedReq);
    }

    return next.handle(request);
  }
}
