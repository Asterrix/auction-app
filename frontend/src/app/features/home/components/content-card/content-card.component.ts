import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Constant} from "../../../../shared/models/enums/constant";

@Component({
  selector: "app-content-card",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "content-card.component.html",
  styleUrls: ["./content-card.component.scss"]
})
export class ContentCardComponent {
  @Input({required: true}) title: string = Constant.EMPTY_VALUE;
  @Input({required: true}) body: string = Constant.EMPTY_VALUE;
  protected readonly Constants = Constant;
}
