import {CommonModule} from "@angular/common";
import {Component, Input} from "@angular/core";
import {Constant} from "../../../../shared/models/enums/constant";

@Component({
  selector: "home-content-card",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "content-card.component.html",
  styleUrls: ["./content-card.component.scss"]
})
export class ContentCardComponent {
  @Input() title: string = Constant.EmptyValue;
  @Input() body: string = Constant.EmptyValue;
  protected readonly Constants = Constant;
}
