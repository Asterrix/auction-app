import {CommonModule} from "@angular/common";
import {Component, Input} from "@angular/core";
import {Severity} from "../../models/errorModel";

@Component({
  selector: "app-alert",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"]
})
export class AlertComponent {
  @Input({required: true}) severity!: Severity;
  @Input({required: true}) message!: string;
  protected readonly Severity = Severity;
}
