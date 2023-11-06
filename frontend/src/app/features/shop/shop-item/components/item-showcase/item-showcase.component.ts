import {CommonModule} from "@angular/common";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {Observable, Subscription} from "rxjs";
import {Api} from "../../../../../shared/services/api.service";
import {ItemService} from "../../../../../shared/services/item.service";
import Item = Api.ItemApi.Interfaces.Item;
import ItemImage = Api.ItemApi.Interfaces.ItemImage;
import ItemAggregate = Api.ItemApi.Interfaces.ItemAggregate;

@Component({
  selector: "shop-item-showcase",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./item-showcase.component.html",
  styleUrls: ["./item-showcase.component.scss"]
})
export class ItemShowcaseComponent implements OnInit, OnDestroy {
  item$: Observable<ItemAggregate | undefined> | undefined;
  activeImage: ItemImage | undefined;
  imagesSub: Subscription | undefined;

  constructor(private itemService: ItemService) {
  }

  ngOnInit(): void {
    this.item$ = this.itemService.getItem();
    this.imagesSub = this.item$.subscribe((item: ItemAggregate | undefined): void => {
      if (item?.item.images && item?.item.images.length > 0) {
        this.activeImage = item?.item.images[0];
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
