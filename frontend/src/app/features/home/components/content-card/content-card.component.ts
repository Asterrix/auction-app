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
  @Input({required: true}) title: string = Constant.EmptyValue;
  @Input({required: true}) body: string = Constant.EmptyValue;
  protected readonly Constants = Constant;
}
