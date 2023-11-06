import {CommonModule} from "@angular/common";
import {Component, Input} from "@angular/core";
import {Observable} from "rxjs";
import {Api} from "../../../../../shared/services/api.service";
import ItemAggregate = Api.ItemApi.Interfaces.ItemAggregate;
import ItemImage = Api.ItemApi.Interfaces.ItemImage;

@Component({
  selector: "shop-item-showcase",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./item-showcase.component.html",
  styleUrls: ["./item-showcase.component.scss"]
})
export class ItemShowcaseComponent {
  @Input({required: true}) item$: Observable<ItemAggregate | undefined> | undefined;
  @Input({required: true}) activeImage: ItemImage | undefined;

  changeActiveImage(image: ItemImage): void {
    this.activeImage = image;
  }
}
