import {CommonModule} from "@angular/common";
import {Component, EventEmitter, Input, Output} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {Observable} from "rxjs";
import {PrimaryButtonComponent} from "../../../../shared/components/buttons/primary-button/primary-button.component";
import {GeneralFormComponent} from "../../../../shared/components/forms/general-form/general-form.component";
import {InputFieldComponent} from "../../../../shared/components/forms/input-field/input-field.component";
import {ErrorModel} from "../../../../shared/models/errorModel";

@Component({
  selector: "form-register",
  standalone: true,
  imports: [CommonModule, GeneralFormComponent, InputFieldComponent, PrimaryButtonComponent, RouterLink],
  templateUrl: "./register-form.component.html",
  styleUrls: ["./register-form.component.scss"]
})
export class RegisterFormComponent {
  @Input({required: true}) error$: Observable<ErrorModel | null> | undefined;
  @Output() submitForm = new EventEmitter<void>();
  protected registerForm = this.fb.group({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  constructor(private fb: FormBuilder) {
  }

  onSubmit(): void {
    this.submitForm.emit();
  }
}
