import {CommonModule} from "@angular/common";
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {debounceTime, Observable, Subscription} from "rxjs";
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
import {PasswordValidator} from "./validators/password.validator";

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
export class RegisterFormComponent implements OnInit, OnDestroy {
  @Input({required: true}) error$: Observable<ErrorModel | null> | undefined;
  @Output() submitForm = new EventEmitter<void>();
  validateFirstName: ValidationPair = {valid: true};
  validateLastName: ValidationPair = {valid: true};
  validatePassword: ValidationPair = {valid: true};
  protected registerForm = this.fb.group({
    firstName: ["", [FirstNameValidator.validator()]],
    lastName: ["", [LastNameValidator.validator()]],
    email: ["", [Validators.required]],
    password: ["", [PasswordValidator.validator()]],
  });
  protected readonly RegisterForm = RegisterForm;
  private formSub?: Subscription;

  constructor(private fb: FormBuilder) {
  }

  public ngOnInit(): void {
    this.formSub = this.registerForm.valueChanges
      .pipe(
        distinctUntilChanged((prev, curr) => prev === curr),
        debounceTime(300)
      )
      .subscribe((value) => {
        const newFirstNameValidation = FirstNameValidator.validateFirstNameInForm(
          this.registerForm,
          RegisterForm.FirstName
        );
        const newLastNameValidation = LastNameValidator.validateLastNameInForm(
          this.registerForm,
          RegisterForm.LastName
        );

        const newPasswordValidation = PasswordValidator.validatePasswordInForm(
          this.registerForm,
          RegisterForm.Password
        );

        if (this.validateFirstName !== newFirstNameValidation) {
          this.validateFirstName = newFirstNameValidation;
        }

        if (this.validateLastName !== newLastNameValidation) {
          this.validateLastName = newLastNameValidation;
        }

        if (this.validatePassword !== newPasswordValidation) {
          this.validatePassword = newPasswordValidation;
        }
      });
  }

  public ngOnDestroy(): void {
    this.formSub?.unsubscribe();
  }

  onSubmit(): void {
    this.submitForm.emit();
  }
}
