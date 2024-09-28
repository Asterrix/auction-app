import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {TokenManager} from "../models/token-manager";
import {Api} from "./api.service";
import {AuthenticationService} from "./authentication.service";

@Injectable({providedIn: "root"})
export class LogoutService {
  constructor(private apiService: Api.Service, private router: Router, private authenticationService: AuthenticationService) {
  }

  logoutUser(): void {
    this.triggerLogoutProcedure();
    this.router.navigate(["/home"]).then(null);
  }

  logoutUserTokenInvalidated(): void {
    this.triggerLogoutProcedure();
    this.router.navigate(["/login"]).then(null);
  };

  private triggerLogoutProcedure(): void {
    this.apiService.logoutUser();
    TokenManager.removeToken();
    this.authenticationService.resetUsername();
  }
}
