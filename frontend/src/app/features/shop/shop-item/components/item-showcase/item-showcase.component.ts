import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, Input} from "@angular/core";
import {Api} from "../../../../../shared/services/api.service";
import ItemImage = Api.ItemApi.Interfaces.ItemImage;

@Component({
  selector: "shop-item-showcase",
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: "./item-showcase.component.html",
  styleUrls: ["./item-showcase.component.scss"]
})
export class ItemShowcaseComponent {
  @Input({required: true}) images!: Array<ItemImage>;
  @Input({required: true}) itemName!: string;
  protected activeImage: ItemImage | undefined;

  changeActiveImage(image: ItemImage): void {
    this.activeImage = image;
  }
}
