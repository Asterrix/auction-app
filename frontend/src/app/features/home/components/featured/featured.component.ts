import {CommonModule} from "@angular/common";
import {Component, Input} from "@angular/core";
import {ItemCardComponent} from "../../../../shared/components/item-card/item-card.component";
import {ItemSummary} from "../../../../shared/services/api/item/item.interface";

@Component({
  selector: "home-featured",
  standalone: true,
  imports: [CommonModule, ItemCardComponent],
  templateUrl: "./featured.component.html",
  styleUrl: "./featured.component.scss"
})
export class FeaturedComponent {
  @Input({required: true}) featuredItems!: ItemSummary[];
}
