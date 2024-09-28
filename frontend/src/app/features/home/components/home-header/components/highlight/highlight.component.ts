import {CommonModule} from "@angular/common";
import {Component, Input} from "@angular/core";
import {RouterLink} from "@angular/router";
import {Observable} from "rxjs";
import {FeaturedItem} from "../../../../../../shared/services/api/item/item.interface";

@Component({
  selector: "home-header-highlight",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./highlight.component.html",
  styleUrls: ["./highlight.component.scss"]
})
export class HighlightComponent {
  @Input({required: true}) featuredItem$: Observable<FeaturedItem | undefined> | undefined;
}
