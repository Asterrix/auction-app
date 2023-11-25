import {CommonModule} from "@angular/common";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {MainNavbarHandler} from "../../shared/components/navbar/components/main-navbar/services/main-navbar-handler.service";
import {Constant} from "../../shared/models/enums/constant";
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
  constructor(private registerService: RegisterService, private mainNavbarHandler: MainNavbarHandler, protected errorService: ErrorService) {
  }

  ngOnInit(): void {
    this.mainNavbarHandler.hideMainNavbar();
  }

  onSubmit(registerForm: FormGroup): void {
    const registerRequest: Required<RegisterRequest> = this.createRegisterRequest(registerForm);
    this.registerService.registerUser(registerRequest);
  }

  ngOnDestroy(): void {
    this.errorService.clearError();
    this.mainNavbarHandler.showMainNavbar();
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
