import {CommonModule} from "@angular/common";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {
  MainNavbarHandler
} from "../../shared/components/navbar/components/main-navbar/services/main-navbar-handler.service";
import {Constant} from "../../shared/models/enums/constant";
import {ErrorModel} from "../../shared/models/errorModel";
import {AlertService} from "../../shared/services/alert.service";
import {Api} from "../../shared/services/api.service";
import {ErrorService} from "../../shared/services/error.service";
import {AuthenticationService} from "../../shared/services/user/authentication.service";
import {LoginForm, LoginFormComponent} from "./components/login-form/login-form.component";
import AuthenticationRequest = Api.UserApi.AuthenticationRequest;

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"]
})
export class LoginPage implements OnInit, OnDestroy {
  error$?: Observable<ErrorModel | null>;

  constructor(private authService: AuthenticationService,
              private mainNavbarHandler: MainNavbarHandler,
              private errorService: ErrorService,
              private alertService: AlertService) {

  }

  ngOnInit(): void {
    this.error$ = this.errorService.getError();
    this.mainNavbarHandler.hideMainNavbar();
  }

  ngOnDestroy(): void {
    this.mainNavbarHandler.showMainNavbar();
    this.errorService.clearErrors();
    this.alertService.clearAlert();
  }

  protected submitForm(authForm: FormGroup): void {
    const authRequest: Required<AuthenticationRequest> = this.createAuthRequest(authForm);
    this.authService.authenticateUser(authRequest);
  }

  private createAuthRequest(authForm: FormGroup): Required<AuthenticationRequest> {
    return {
      email: authForm.get(LoginForm.Email)?.value ?? Constant.EmptyValue,
      password: authForm.get(LoginForm.Password)?.value ?? Constant.EmptyValue,
      rememberMe: authForm.get(LoginForm.RememberMe)?.value ?? false
    };
  }
}
