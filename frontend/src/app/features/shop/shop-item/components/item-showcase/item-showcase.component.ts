import {Component, OnDestroy, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Item, ItemImage, ItemService} from "../../services/item.service";

@Component({
  selector: "app-item-showcase",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./item-showcase.component.html",
  styleUrls: ["./item-showcase.component.scss"]
})
export class ItemShowcaseComponent implements OnInit, OnDestroy {
  activeImage: ItemImage | undefined;
  listOfImages: Array<ItemImage> | undefined;

  constructor(private itemService: ItemService) {
  }

  ngOnInit(): void {
    this.itemService.item$.data$.subscribe((item: Item | undefined) => {
      this.activeImage = item?.itemImages?.at(0);
      this.listOfImages = item?.itemImages;
    });
  }

  ngOnDestroy(): void {
    this.itemService.item$.unsubscribe();
  }


  changeActiveImage(image: ItemImage): void {
    this.activeImage = image;
  }
}
