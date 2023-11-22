import {CommonModule} from "@angular/common";
import {Component, Input} from "@angular/core";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: "form-input-field",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./input-field.component.html",
  styleUrls: ["./input-field.component.scss"]
})
export class InputFieldComponent {
  @Input({required: true}) label!: string;
  @Input({required: true}) type!: string;
  @Input({required: true}) placeholder!: string;
  @Input({required: true}) formFieldGroup!: FormGroup;
  @Input({required: true}) formField!: string;
  @Input({required: false}) isInputValid!: boolean | undefined;
}
