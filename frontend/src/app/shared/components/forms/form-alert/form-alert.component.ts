import {CommonModule} from "@angular/common";
import {Component, Input, Signal} from "@angular/core";
import {Alert, AlertType} from "../../../services/alert.service";

@Component({
  selector: "form-alert",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./form-alert.component.html",
  styleUrls: ["./form-alert.component.scss"]
})
export class FormAlertComponent {
  @Input({required: true}) alert!: Signal<Alert>;
  protected readonly AlertType = AlertType;
}
