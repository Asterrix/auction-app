import {CommonModule} from "@angular/common";
import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {debounceTime, Observable} from "rxjs";
import {distinctUntilChanged} from "rxjs/operators";
import {PrimaryButtonComponent} from "../../../../shared/components/buttons/primary-button/primary-button.component";
import {GeneralFormComponent} from "../../../../shared/components/forms/general-form/general-form.component";
import {InputFieldComponent} from "../../../../shared/components/forms/input-field/input-field.component";
import {
  ValidationMessageComponent
} from "../../../../shared/components/forms/validation/validation-message/validation-message.component";
import {ErrorModel} from "../../../../shared/models/errorModel";
import {FirstNameValidator} from "./validators/first-name.validator";
import {LastNameValidator} from "./validators/last-name.validator";

enum RegisterForm {
  FirstName = "firstName",
  LastName = "lastName",
  Email = "email",
  Password = "password"
}

export interface ValidationPair {
  valid: boolean;
  message?: string;
}

@Component({
  selector: "form-register",
  standalone: true,
  imports: [CommonModule, GeneralFormComponent, InputFieldComponent, PrimaryButtonComponent, RouterLink, ValidationMessageComponent],
  templateUrl: "./register-form.component.html",
  styleUrls: ["./register-form.component.scss"]
})
export class RegisterFormComponent implements OnInit {
  @Input({required: true}) error$: Observable<ErrorModel | null> | undefined;
  @Output() submitForm = new EventEmitter<void>();
  validateFirstName: ValidationPair = {valid: true};
  validateLastName: ValidationPair = {valid: true};
  protected registerForm = this.fb.group({
    firstName: ["", [FirstNameValidator.validator()]],
    lastName: ["", [LastNameValidator.validator()]],
    email: ["", [Validators.required]],
    password: ["", [Validators.required]],
  });
  protected readonly RegisterForm = RegisterForm;

  constructor(private fb: FormBuilder) {
  }

  public ngOnInit(): void {
    this.registerForm.valueChanges.pipe(distinctUntilChanged(), debounceTime(300)).subscribe(value => {
      this.validateFirstName = FirstNameValidator.validateFirstNameInForm(this.registerForm, RegisterForm.FirstName);
      this.validateLastName = LastNameValidator.validateLastNameInForm(this.registerForm, RegisterForm.LastName);
    });
  }

  onSubmit(): void {
    this.submitForm.emit();
  }

}
