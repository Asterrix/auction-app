import {CommonModule} from "@angular/common";
import {Component, EventEmitter, Input, Output} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import {Observable} from "rxjs";
import {PrimaryButtonComponent} from "../../../../shared/components/buttons/primary-button/primary-button.component";
import {CheckboxShape} from "../../../../shared/components/checkboxes/checkbox/checkbox.component";
import {CheckboxFieldComponent} from "../../../../shared/components/forms/checkbox-field/checkbox-field.component";
import {GeneralFormComponent} from "../../../../shared/components/forms/general-form/general-form.component";
import {InputFieldComponent} from "../../../../shared/components/forms/input-field/input-field.component";
import {Constant} from "../../../../shared/models/enums/constant";
import {ErrorModel} from "../../../../shared/models/errorModel";
import {Api} from "../../../../shared/services/api.service";
import Authentication = Api.UserApi.Authentication;

@Component({
  selector: "app-login-form",
  standalone: true,
  imports: [CommonModule, GeneralFormComponent, InputFieldComponent, CheckboxFieldComponent, PrimaryButtonComponent],
  templateUrl: "./login-form.component.html"
})
export class LoginFormComponent {
  @Output() submitEvent = new EventEmitter<Required<Authentication>>();
  @Input({required: true}) error$: Observable<ErrorModel | null> | undefined;
  protected loginForm = this.fb.group({
    email: "",
    password: "",
    rememberMe: false
  });
  protected readonly CheckboxShape = CheckboxShape;

  constructor(private fb: FormBuilder) {
  }

  onSubmit(): void {
    this.submitEvent.emit(this.createAuthRequest());
  }

  setRememberMe(): void {
    const currentVal = this.loginForm.get("rememberMe");
    if (currentVal) {
      currentVal.setValue(!currentVal.value);
    }
  }

  private createAuthRequest(): Required<Authentication> {
    return {
      username: this.loginForm.get("email")?.value ?? Constant.EmptyValue,
      password: this.loginForm.get("password")?.value ?? Constant.EmptyValue,
      rememberMe: this.loginForm.get("rememberMe")?.value ?? false
    };
  }
}
