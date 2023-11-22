import {CommonModule} from "@angular/common";
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {debounceTime, Observable, Subscription} from "rxjs";
import {distinctUntilChanged} from "rxjs/operators";
import {PrimaryButtonComponent} from "../../../../shared/components/buttons/primary-button/primary-button.component";
import {GeneralFormComponent} from "../../../../shared/components/forms/general-form/general-form.component";
import {InputFieldComponent} from "../../../../shared/components/forms/input-field/input-field.component";
import {
  ValidationMessageComponent
} from "../../../../shared/components/forms/validation/validation-message/validation-message.component";
import {Constant} from "../../../../shared/models/enums/constant";
import {ErrorModel, Severity} from "../../../../shared/models/errorModel";
import {Api} from "../../../../shared/services/api.service";
import {ErrorService} from "../../../../shared/services/error.service";
import {EmailValidator} from "./validators/email.validator";
import {FirstNameValidator} from "./validators/first-name.validator";
import {LastNameValidator} from "./validators/last-name.validator";
import {PasswordValidator} from "./validators/password.validator";
import Register = Api.UserApi.Register;

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
  @Output() submitForm = new EventEmitter<Required<Register>>();
  validateFirstName: ValidationPair = {valid: true};
  validateLastName: ValidationPair = {valid: true};
  validateEmail: ValidationPair = {valid: true};
  validatePassword: ValidationPair = {valid: true};
  protected registerForm = this.fb.group({
    firstName: ["", [FirstNameValidator.validator()]],
    lastName: ["", [LastNameValidator.validator()]],
    email: ["", [EmailValidator.validator()]],
    password: ["", [PasswordValidator.validator()]],
  });
  protected readonly RegisterForm = RegisterForm;
  private formSub?: Subscription;

  constructor(private fb: FormBuilder, private errorService: ErrorService) {
  }

  public ngOnInit(): void {
    this.formSub = this.registerForm.valueChanges
      .pipe(
        distinctUntilChanged((prev, curr) => prev === curr),
        debounceTime(300)
      )
      .subscribe(() => {
        const newFirstNameValidation = FirstNameValidator.validateFirstNameInForm(this.registerForm, RegisterForm.FirstName);

        const newLastNameValidation = LastNameValidator.validateLastNameInForm(this.registerForm, RegisterForm.LastName);

        const newEmailValidation = EmailValidator.validateEmailInForm(this.registerForm, RegisterForm.Email);

        const newPasswordValidation = PasswordValidator.validatePasswordInForm(this.registerForm, RegisterForm.Password);

        if (this.validateFirstName !== newFirstNameValidation) {
          this.validateFirstName = newFirstNameValidation;
        }

        if (this.validateLastName !== newLastNameValidation) {
          this.validateLastName = newLastNameValidation;
        }

        if (this.validateEmail !== newEmailValidation) {
          this.validateEmail = newEmailValidation;
        }

        if (this.validatePassword !== newPasswordValidation) {
          this.validatePassword = newPasswordValidation;
        }

        if (this.errorService.isPresent()) {
          this.errorService.clearErrorSubject();
        }
      });
  }

  public ngOnDestroy(): void {
    this.formSub?.unsubscribe();
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const form: Required<Register> = {
        email: this.registerForm.get(RegisterForm.Email)?.value ?? Constant.EmptyValue,
        firstName: this.registerForm.get(RegisterForm.FirstName)?.value ?? Constant.EmptyValue,
        lastName: this.registerForm.get(RegisterForm.LastName)?.value ?? Constant.EmptyValue,
        password: this.registerForm.get(RegisterForm.Password)?.value ?? Constant.EmptyValue
      };
      this.submitForm.emit(form);
    } else {
      this.errorService.initialiseError(Severity.NORMAL, "Please fill in the form.");
    }
  }
}
