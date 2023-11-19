import {CommonModule} from "@angular/common";
import {Component, Input} from "@angular/core";
import {CheckboxComponent, CheckboxShape} from "../../checkboxes/checkbox/checkbox.component";

@Component({
  selector: "form-checkbox-field",
  standalone: true,
  imports: [CommonModule, CheckboxComponent],
  templateUrl: "./checkbox-field.component.html",
  styleUrls: ["./checkbox-field.component.scss"]
})
export class CheckboxFieldComponent {
  @Input({required: true}) isActive!: boolean;
  @Input({required: true}) shape!: CheckboxShape;
  @Input({required: true}) label!: string;
}
