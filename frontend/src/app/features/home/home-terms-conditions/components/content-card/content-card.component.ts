import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";

@Component({
  selector: "app-content-card",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "content-card.component.html",
  styleUrls: ["./content-card.component.scss"]
})
export class ContentCardComponent {
  @Input({required: true}) title!: string;
  @Input({required: true}) body!: string;
}
