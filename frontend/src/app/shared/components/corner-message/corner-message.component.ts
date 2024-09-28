import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, inject} from "@angular/core";
import {CornerMessageService} from "./corner-message.service";

@Component({
  selector: "app-corner-message",
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: "./corner-message.component.html",
  styleUrl: "./corner-message.component.scss"
})
export class CornerMessageComponent {
  private messageDisplayService = inject(CornerMessageService);
  protected displayMessage = this.messageDisplayService.displayMessage$;
}
