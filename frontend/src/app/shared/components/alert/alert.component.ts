import {CommonModule} from "@angular/common";
import {Component, Input} from "@angular/core";
import {Severity} from "../../models/errorModel";

export enum AlertType {
  Warning,
  SuccessInfo
}

@Component({
  selector: "app-alert",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"]
})
export class AlertComponent {
  @Input({required: false}) severity!: Severity;
  @Input({required: true}) message!: string;
  @Input({required: true}) type!: AlertType;
  protected readonly Severity = Severity;
  protected readonly AlertType = AlertType;
}
