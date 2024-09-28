import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {TokenManager} from "../../models/token-manager";
import {Api} from "../api.service";
import {AuthenticationService} from "./authentication.service";

@Injectable({providedIn: "root"})
export class LogoutService {
  constructor(private router: Router, private apiService: Api.Service, private authService: AuthenticationService) {
  }

  logoutUser(): void {
    this.apiService.logoutUser().subscribe(response => {
      if (response) {
        this.triggerLogoutProcedure();
        this.navigateToHomeRoute();
      }
    });
  }

  logoutUserTokenInvalidated(): void {
    this.apiService.logoutUser();
    this.triggerLogoutProcedure();
    this.navigateToLoginRoute();
  };

  private navigateToLoginRoute(): void {
    this.router.navigate(["/login"]).then(null);
  }

  private navigateToHomeRoute(): void {
    this.router.navigate(["/home"]).then(null);
  }

  private triggerLogoutProcedure(): void {
    TokenManager.removeToken();
    this.authService.resetUsername();
  }
}
