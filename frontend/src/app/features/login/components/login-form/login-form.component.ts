import {CommonModule} from "@angular/common";
import {Component, EventEmitter, Output} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PrimaryButtonComponent} from "../../../../shared/components/buttons/primary-button/primary-button.component";
import {CheckboxShape} from "../../../../shared/components/checkboxes/checkbox/checkbox.component";
import {CheckboxFieldComponent} from "../../../../shared/components/forms/checkbox-field/checkbox-field.component";
import {GeneralFormComponent} from "../../../../shared/components/forms/general-form/general-form.component";
import {InputFieldComponent} from "../../../../shared/components/forms/input-field/input-field.component";
import {Constant} from "../../../../shared/models/enums/constant";
import {AlertType} from "../../../../shared/services/alert.service";
import {ErrorService} from "../../../../shared/services/error.service";


export enum LoginForm {
  Email = "email",
  Password = "password",
  RememberMe = "rememberMe"
}

@Component({
  selector: "app-login-form",
  standalone: true,
  imports: [CommonModule, GeneralFormComponent, InputFieldComponent, CheckboxFieldComponent, PrimaryButtonComponent],
  templateUrl: "./login-form.component.html"
})
export class LoginFormComponent {
  @Output()
  submitEvent = new EventEmitter<FormGroup>();

  protected readonly CheckboxShape = CheckboxShape;
  protected loginForm = this.formBuilder.group({
    email: [Constant.EmptyValue, [Validators.required]],
    password: [Constant.EmptyValue, [Validators.required]],
    rememberMe: false
  });

  constructor(private formBuilder: FormBuilder, protected errorService: ErrorService) {
  }

  protected onSubmit(): void {
    if (this.loginForm.valid) {
      this.submitEvent.emit(this.loginForm);
    } else {
      this.errorService.setError({message: "Please fill in the form.", type: AlertType.WarningLevelOne});
    }
  }

  protected setRememberMe(): void {
    const currentVal = this.loginForm.get(LoginForm.RememberMe);
    if (currentVal) {
      currentVal.setValue(!currentVal.value);
    }
  }
}
