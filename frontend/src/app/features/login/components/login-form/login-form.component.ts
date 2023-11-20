import {CommonModule} from "@angular/common";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {Observable} from "rxjs";
import {AlertComponent} from "../../../../shared/components/alert/alert.component";
import {PrimaryButtonComponent} from "../../../../shared/components/buttons/primary-button/primary-button.component";
import {CheckboxComponent, CheckboxShape} from "../../../../shared/components/checkboxes/checkbox/checkbox.component";
import {CheckboxFieldComponent} from "../../../../shared/components/forms/checkbox-field/checkbox-field.component";
import {InputFieldComponent} from "../../../../shared/components/forms/input-field/input-field.component";
import {Api} from "../../../../shared/services/api.service";
import {ErrorService} from "../../../../shared/services/error.service";
import {AuthenticationService} from "../../../../shared/services/authentication.service";
import Authentication = Api.UserApi.Authentication;

@Component({
  selector: "app-login-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PrimaryButtonComponent, CheckboxComponent, InputFieldComponent, CheckboxFieldComponent, AlertComponent],
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent implements OnInit, OnDestroy {
  loginForm = this.fb.group({
    email: "",
    password: "",
    rememberMe: false
  });
  error$: Observable<string> | undefined;
  protected readonly CheckboxShape = CheckboxShape;

  constructor(private fb: FormBuilder, private userService: AuthenticationService, private errorService: ErrorService) {
  }

  ngOnInit(): void {
    this.error$ = this.errorService.getErrorMessage();
  }

  onSubmit(): void {
    const auth: Required<Authentication> = {
      username: this.loginForm.get("email")?.value ?? "",
      password: this.loginForm.get("password")?.value ?? ""
    };
    this.userService.authenticateUser(auth);
  }

  setRememberMe(): void {
    const currentVal = this.loginForm.get("rememberMe");
    if (currentVal) {
      currentVal.setValue(!currentVal.value);
    }
  }

  ngOnDestroy(): void {
    this.errorService.clearErrorMessage();
  }
}
