import {CommonModule} from "@angular/common";
import {Component, Input} from "@angular/core";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-form-phone-number',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-phone-number.component.html',
  styleUrl: './form-phone-number.component.scss'
})
export class FormPhoneNumberComponent {
  @Input({required: true}) controlGroup!: FormGroup;
  @Input({required: true}) controlName!: string;
}
