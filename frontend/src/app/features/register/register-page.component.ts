import {CommonModule} from "@angular/common";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {MainNavbarService} from "../../shared/components/navbar/components/main-navbar/services/main-navbar.service";
import {Constant} from "../../shared/models/enums/constant";
import {ErrorModel} from "../../shared/models/errorModel";
import {Api} from "../../shared/services/api.service";
import {ErrorService} from "../../shared/services/error.service";
import {RegisterService} from "../../shared/services/user/register.service";
import {RegisterForm, RegisterFormComponent} from "./components/register-form/register-form.component";
import RegisterRequest = Api.UserApi.RegisterRequest;

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, RegisterFormComponent],
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.scss"]
})
export class RegisterPage implements OnInit, OnDestroy {
  error$?: Observable<ErrorModel | null>;

  constructor(private registerService: RegisterService, private navbarService: MainNavbarService, private errorService: ErrorService) {
  }

  ngOnInit(): void {
    this.error$ = this.errorService.getError();
    this.navbarService.displayMinimalNavbar(true);
  }

  onSubmit(registerForm: FormGroup): void {
    const registerRequest: Required<RegisterRequest> = this.createRegisterRequest(registerForm);
    this.registerService.registerUser(registerRequest);
  }

  ngOnDestroy(): void {
    this.errorService.clearErrors();
    this.navbarService.displayMinimalNavbar(false);
  }

  private createRegisterRequest(registerForm: FormGroup): Required<RegisterRequest> {
    return {
      email: registerForm.get(RegisterForm.Email)?.value ?? Constant.EmptyValue,
      firstName: registerForm.get(RegisterForm.FirstName)?.value ?? Constant.EmptyValue,
      lastName: registerForm.get(RegisterForm.LastName)?.value ?? Constant.EmptyValue,
      password: registerForm.get(RegisterForm.Password)?.value ?? Constant.EmptyValue
    };
  }
}
