import {CommonModule} from "@angular/common";
import {Component} from "@angular/core";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {PrimaryButtonComponent} from "../../../../shared/components/buttons/primary-button/primary-button.component";
import {CheckboxComponent, CheckboxShape} from "../../../../shared/components/checkboxes/checkbox/checkbox.component";
import {CheckboxFieldComponent} from "../../../../shared/components/forms/checkbox-field/checkbox-field.component";
import {InputFieldComponent} from "../../../../shared/components/forms/input-field/input-field.component";

@Component({
  selector: "app-login-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PrimaryButtonComponent, CheckboxComponent, InputFieldComponent, CheckboxFieldComponent],
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent {
  loginForm = this.fb.group({
    email: "",
    password: "",
    rememberMe: false
  });

  constructor(private fb: FormBuilder) {
  }

  onSubmit(): void {
  }

  setRememberMe(): void {
    const currentVal = this.loginForm.get("rememberMe");
    if (currentVal) {
      currentVal.setValue(!currentVal.value);
    }
  }

  protected readonly CheckboxShape = CheckboxShape;
}
