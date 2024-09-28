import {CommonModule} from "@angular/common";
import {Component, Input} from "@angular/core";

@Component({
  selector: "form-wrapper",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./form-wrapper.component.html",
  styleUrl: "./form-wrapper.component.scss"
})
export class FormWrapperComponent {
  @Input({required: true}) formSubject!: string;
}
