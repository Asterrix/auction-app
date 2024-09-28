import {CommonModule} from "@angular/common";
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, Signal} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {debounceTime, Subscription} from "rxjs";
import {distinctUntilChanged} from "rxjs/operators";
import {PrimaryButtonComponent} from "../../../../shared/components/buttons/primary-button/primary-button.component";
import {GeneralFormComponent} from "../../../../shared/components/forms/general-form/general-form.component";
import {InputFieldComponent} from "../../../../shared/components/forms/input-field/input-field.component";
import {
  ValidationMessageComponent
} from "../../../../shared/components/forms/validation-message/validation-message.component";
import {Constant} from "../../../../shared/models/enums/constant";
import {Alert, AlertType} from "../../../../shared/services/alert.service";
import {ErrorService} from "../../../../shared/services/error.service";
import {EmailValidator} from "./validators/email.validator";
import {FirstNameValidator} from "./validators/first-name.validator";
import {LastNameValidator} from "./validators/last-name.validator";
import {NameValidator} from "./validators/name-validator";
import {PasswordValidator} from "./validators/password.validator";
import {ValidationPair} from "./validators/validation.pair";

export enum RegisterForm {
  FirstName = "firstName",
  LastName = "lastName",
  Email = "email",
  Password = "password"
}


export interface RegisterFormFieldChange {
  controlField: RegisterForm;
  validationFn: (formGroup: FormGroup, fieldName: RegisterForm) => ValidationPair;
}

export interface RegisterFormNameFieldChange {
  controlField: RegisterForm,
  validationFn: (formGroup: FormGroup, fieldName: RegisterForm, config: NameValidator.Config) => ValidationPair,
  config: NameValidator.Config
}

@Component({
  selector: "form-register",
  standalone: true,
  imports: [CommonModule, GeneralFormComponent, InputFieldComponent, PrimaryButtonComponent, RouterLink, ValidationMessageComponent],
  templateUrl: "./register-form.component.html",
  styleUrls: ["./register-form.component.scss"]
})
export class RegisterFormComponent implements OnInit, OnDestroy {
  @Output() submitForm = new EventEmitter<FormGroup>();
  // Set to true initially so that the invalid CSS class is not invoked
  validationStatus: Record<RegisterForm, ValidationPair> = {
    [RegisterForm.FirstName]: {valid: true},
    [RegisterForm.LastName]: {valid: true},
    [RegisterForm.Email]: {valid: true},
    [RegisterForm.Password]: {valid: true}
  };
  protected readonly RegisterForm = RegisterForm;
  protected registerForm = this.formBuilder.group({
    firstName: [Constant.EmptyValue, [NameValidator.validator(FirstNameValidator.config)]],
    lastName: [Constant.EmptyValue, [NameValidator.validator(LastNameValidator.config)]],
    email: [Constant.EmptyValue, [EmailValidator.validator()]],
    password: [Constant.EmptyValue, [PasswordValidator.validator()]],
  });

  private formFieldSubscription: Record<string, Subscription | undefined> = {};

  constructor(private formBuilder: FormBuilder, private errorService: ErrorService) {
  }

  public ngOnInit(): void {
    this.formFieldSubscription[RegisterForm.FirstName] = this.subscribeToNameFieldChanges({
      controlField: RegisterForm.FirstName,
      validationFn: NameValidator.validateName,
      config: FirstNameValidator.config
    });

    this.formFieldSubscription[RegisterForm.LastName] = this.subscribeToNameFieldChanges({
      controlField: RegisterForm.LastName,
      validationFn: NameValidator.validateName,
      config: LastNameValidator.config
    });

    this.formFieldSubscription[RegisterForm.Email] = this.subscribeToFieldChanges({
      controlField: RegisterForm.Email,
      validationFn: EmailValidator.validateEmailInForm,
    });

    this.formFieldSubscription[RegisterForm.Email] = this.subscribeToFieldChanges({
      controlField: RegisterForm.Password,
      validationFn: PasswordValidator.validatePasswordInForm,
    });

    if (this.errorService.isPresent()) {
      this.errorService.clearError();
    }
  }

  public ngOnDestroy(): void {
    for (const subscription in this.formFieldSubscription) {
      if (this.formFieldSubscription[subscription]) {
        this.formFieldSubscription[subscription]?.unsubscribe();
      }
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.submitForm.emit(this.registerForm);
    } else {
      this.errorService.setError({message: "Please fill in the form.", type: AlertType.WarningLevelOne});
    }
  }

  public subscribeToFieldChanges(param: RegisterFormFieldChange): Subscription | undefined {
    return this.registerForm.get(param.controlField)?.valueChanges
      .pipe(distinctUntilChanged((prev, curr) => prev === curr), debounceTime(300))
      .subscribe(() => {
        const newValidation = param.validationFn(this.registerForm, param.controlField);

        if (this.validationStatus[param.controlField] !== newValidation) {
          this.validationStatus[param.controlField] = newValidation;
        }
      });
  }

  private subscribeToNameFieldChanges(param: RegisterFormNameFieldChange): Subscription | undefined {
    return this.registerForm.get(param.controlField)?.valueChanges
      .pipe(distinctUntilChanged((prev, curr) => prev === curr), debounceTime(300))
      .subscribe(() => {
        const newValidation = param.validationFn(this.registerForm, param.controlField, param.config);

        if (this.validationStatus[param.controlField] !== newValidation) {
          this.validationStatus[param.controlField] = newValidation;
        }
      });
  }
}


