import {CommonModule} from "@angular/common";
import {Component, EventEmitter, Input, Output} from "@angular/core";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AlertService, AlertType} from "../../../services/alert.service";
import {ErrorService} from "../../../services/error.service";
import {PrimaryButtonComponent} from "../../buttons/primary-button/primary-button.component";
import {CheckboxFieldComponent} from "../checkbox-field/checkbox-field.component";
import {FormAlertComponent} from "../form-alert/form-alert.component";
import {InputFieldComponent} from "../input-field/input-field.component";

@Component({
  selector: "form-general",
  standalone: true,
  imports: [CommonModule, FormAlertComponent, CheckboxFieldComponent, InputFieldComponent, PrimaryButtonComponent, ReactiveFormsModule],
  templateUrl: "./general-form.component.html",
  styleUrls: ["./general-form.component.scss"]
})
export class GeneralFormComponent {
  @Input({required: true}) label!: string;
  @Input({required: true}) formFieldGroup!: FormGroup;
  @Output() submitForm = new EventEmitter<void>();

  constructor(protected alertService: AlertService, protected errorService: ErrorService) {
  }

  onSubmit(): void {
    this.submitForm.emit();
  }

  protected readonly AlertType = AlertType;
}
