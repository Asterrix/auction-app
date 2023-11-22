import {Component, EventEmitter, Input, Output} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Observable} from "rxjs";
import {ErrorModel} from "../../../models/errorModel";
import {AlertComponent, AlertType} from "../../alert/alert.component";
import {PrimaryButtonComponent} from "../../buttons/primary-button/primary-button.component";
import {CheckboxFieldComponent} from "../checkbox-field/checkbox-field.component";
import {InputFieldComponent} from "../input-field/input-field.component";

@Component({
  selector: "form-general",
  standalone: true,
  imports: [CommonModule, AlertComponent, CheckboxFieldComponent, InputFieldComponent, PrimaryButtonComponent, ReactiveFormsModule],
  templateUrl: "./general-form.component.html",
  styleUrls: ["./general-form.component.scss"]
})
export class GeneralFormComponent {
  @Input({required: true}) label!: string;
  @Input({required: true}) error$!: Observable<ErrorModel | null> | undefined;
  @Input({required: true}) formFieldGroup!: FormGroup;
  @Input({required: false}) alert$!: Observable<string> | undefined;
  @Output() submitForm = new EventEmitter<void>();

  onSubmit(): void {
    this.submitForm.emit();
  }

  protected readonly AlertType = AlertType;
}
