import {CommonModule} from "@angular/common";
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {debounceTime, Observable, Subscription} from "rxjs";
import {distinctUntilChanged} from "rxjs/operators";
import {PrimaryButtonComponent} from "../../../../shared/components/buttons/primary-button/primary-button.component";
import {CheckboxShape} from "../../../../shared/components/checkboxes/checkbox/checkbox.component";
import {CheckboxFieldComponent} from "../../../../shared/components/forms/checkbox-field/checkbox-field.component";
import {GeneralFormComponent} from "../../../../shared/components/forms/general-form/general-form.component";
import {InputFieldComponent} from "../../../../shared/components/forms/input-field/input-field.component";
import {Constant} from "../../../../shared/models/enums/constant";
import {ErrorModel, Severity} from "../../../../shared/models/errorModel";
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
export class LoginFormComponent implements OnInit, OnDestroy {
  @Output()
  submitEvent = new EventEmitter<FormGroup>();

  @Input({required: true})
  error$?: Observable<ErrorModel | null>;
  formSub?: Subscription;
  protected readonly CheckboxShape = CheckboxShape;
  protected loginForm = this.formBuilder.group({
    email: [Constant.EmptyValue, [Validators.required]],
    password: [Constant.EmptyValue, [Validators.required]],
    rememberMe: false
  });

  constructor(private formBuilder: FormBuilder, private errorService: ErrorService) {
  }

  public ngOnInit(): void {
    this.formSub = this.loginForm.valueChanges.pipe(
      distinctUntilChanged((prev, curr) => prev === curr),
      debounceTime(300)
    ).subscribe(value => {
      if (this.errorService.isPresent() && this.loginForm.valid) {
        this.errorService.clearErrors();
      }
    });
  }

  public ngOnDestroy(): void {
    this.formSub?.unsubscribe();
  }

  protected onSubmit(): void {
    if (this.loginForm.valid) {
      this.submitEvent.emit(this.loginForm);
    } else {
      this.errorService.initialiseError(Severity.NORMAL, "Please fill in the form.");
    }
  }

  protected setRememberMe(): void {
    const currentVal = this.loginForm.get(LoginForm.RememberMe);
    if (currentVal) {
      currentVal.setValue(!currentVal.value);
    }
  }
}
