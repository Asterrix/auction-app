import {CommonModule} from "@angular/common";
import {Component, Input} from "@angular/core";
import {RouterLink} from "@angular/router";
import {ItemSummary} from "../../services/api/item/item.interface";
import {ItemCardFontSizeDirective} from "./directive/item-card-font-size.directive";
import {ItemLayoutDirective} from "./directive/item-layout.directive";
import {ItemLayout} from "./directive/item.layout.type";


@Component({
  selector: "app-item-card",
  standalone: true,
  imports: [CommonModule, RouterLink, ItemLayoutDirective, ItemCardFontSizeDirective],
  templateUrl: "./item-card.component.html",
  styleUrls: ["./item-card.component.scss"]
})
export class ItemCardComponent {
  @Input({required: true}) item!: ItemSummary;
  @Input({required: true}) layout!: ItemLayout;
}
