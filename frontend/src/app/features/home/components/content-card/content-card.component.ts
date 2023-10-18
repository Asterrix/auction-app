import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Constants} from "../../../../shared/models/enums/constants";

@Component({
  selector: "app-content-card",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "content-card.component.html",
  styleUrls: ["./content-card.component.scss"]
})
export class ContentCardComponent {
  @Input({required: true}) title: string = Constants.EMPTY_VALUE;
  @Input({required: true}) body: string = Constants.EMPTY_VALUE;
  protected readonly Constants = Constants;
}
