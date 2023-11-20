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
    this.apiService.logoutUser().subscribe(response => {
      if (response.status === 200) {
        TokenManager.removeToken();
        this.authenticationService.resetUsername();
        this.router.navigate(["/home"]).then(null);
      }
    });
  }
}
