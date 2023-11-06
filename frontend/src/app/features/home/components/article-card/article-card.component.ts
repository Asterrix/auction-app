import {CommonModule} from "@angular/common";
import {Component, Input} from "@angular/core";
import {Constant} from "../../../../shared/models/enums/constant";

@Component({
  selector: "home-article-card",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "article-card.component.html",
  styleUrls: ["./article-card.component.scss"]
})
export class ArticleCardComponent {
  @Input() title: string = Constant.EmptyValue;
  @Input() body: string = Constant.EmptyValue;
  protected readonly Constants = Constant;
}
