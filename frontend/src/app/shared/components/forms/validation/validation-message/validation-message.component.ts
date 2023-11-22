import {CommonModule} from "@angular/common";
import {Component, Input} from "@angular/core";

@Component({
  selector: "app-validation-message",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./validation-message.component.html",
  styleUrls: ["./validation-message.component.scss"]
})
export class ValidationMessageComponent {
  @Input({required: true}) message!: string | null;
}
