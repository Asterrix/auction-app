import {Component, OnDestroy, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Observable, Subscription} from "rxjs";
import {Item, ItemImage, ItemService} from "../../../../../shared/services/item.service";

@Component({
  selector: "app-item-showcase",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./item-showcase.component.html",
  styleUrls: ["./item-showcase.component.scss"]
})
export class ItemShowcaseComponent implements OnInit, OnDestroy {
  item$: Observable<Item> = {} as Observable<Item>;
  activeImage: ItemImage = {} as ItemImage;
  imagesSub: Subscription | undefined;

  constructor(private itemService: ItemService) {
  }

  ngOnInit(): void {
    this.item$ = this.itemService.getItem();
    this.imagesSub = this.item$.subscribe((item: Item): void => {
      if (item.itemImages && item.itemImages.length > 0) {
        this.activeImage = item.itemImages[0];
      }
    });
  }

  ngOnDestroy(): void {
    if (this.imagesSub) {
      this.imagesSub.unsubscribe();
    }
  }

  changeActiveImage(image: ItemImage) {
    this.activeImage = image;
  }
}
