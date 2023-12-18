import {CommonModule} from "@angular/common";
import {Component, Input} from "@angular/core";
import {Alert, AlertType} from "../../../../../shared/services/alert.service";

@Component({
  selector: "app-bid-notification",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./bid-notification.component.html",
  styleUrls: ["./bid-notification.component.scss"]
})
export class BidNotificationComponent {
  @Input({required: true}) alert!: Alert;
  protected readonly AlertType = AlertType;
}
