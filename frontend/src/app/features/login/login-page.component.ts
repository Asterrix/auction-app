import {CommonModule} from "@angular/common";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {MainNavbarService} from "../../shared/components/navbar/components/main-navbar/services/main-navbar.service";
import {ErrorModel} from "../../shared/models/errorModel";
import {Api} from "../../shared/services/api.service";
import {AuthenticationService} from "../../shared/services/user/authentication.service";
import {ErrorService} from "../../shared/services/error.service";
import {LoginFormComponent} from "./components/login-form/login-form.component";
import Authentication = Api.UserApi.Authentication;

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"]
})
export class LoginPage implements OnInit, OnDestroy {
  error$: Observable<ErrorModel | null> | undefined;

  constructor(private authService: AuthenticationService, private navbarService: MainNavbarService, private errorService: ErrorService) {

  }

  ngOnInit(): void {
    this.error$ = this.errorService.getError();
    this.navbarService.displayMinimalNavbar(true);
  }

  ngOnDestroy(): void {
    this.navbarService.displayMinimalNavbar(false);
    this.errorService.clearErrorSubject();
  }

  submitForm(authParams: Required<Authentication>): void {
    this.authService.authenticateUser(authParams);
  }
}
