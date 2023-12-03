import {CommonModule} from "@angular/common";
import {Component, Input} from "@angular/core";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {
  ValidationMessageComponent
} from "../../../../../shared/components/forms/validation-message/validation-message.component";

@Component({
  selector: "app-form-member",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ValidationMessageComponent],
  templateUrl: "./form-member.component.html",
  styleUrl: "./form-member.component.scss"
})
export class FormMemberComponent {
  @Input({required: false}) controlGroup!: FormGroup;
  @Input({required: false}) controlName!: string;
  @Input({required: true}) memberId!: string;
  @Input({required: true}) memberLabel!: string;
  @Input({required: true}) placeholder!: string;
  @Input({required: true}) inputType!: string;
  @Input({required: false}) valid!: boolean;
}
