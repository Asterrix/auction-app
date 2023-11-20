import {CommonModule} from "@angular/common";
import {Component, Input} from "@angular/core";

@Component({
  selector: "app-alert",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"]
})
export class AlertComponent {
  @Input({required: true}) message!: string;
}
