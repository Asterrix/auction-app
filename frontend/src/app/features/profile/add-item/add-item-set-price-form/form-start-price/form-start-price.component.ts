import {CommonModule} from "@angular/common";
import {Component, Input} from "@angular/core";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: "app-form-start-price",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./form-start-price.component.html",
  styleUrl: "./form-start-price.component.scss"
})
export class FormStartPriceComponent {
  @Input({required: true}) formFieldGroup!: FormGroup;
  @Input({required: true}) formField!: string;
  @Input({required: true}) isValid!: boolean;
}
