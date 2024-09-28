import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";

@Component({
  selector: "app-form-date-picker",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./form-datepicker.component.html",
  styleUrl: "./form-datepicker.component.scss"
})
export class FormDatepicker {
  @Input({required: true}) fieldLabel!: string;
}
