import {CommonModule} from "@angular/common";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {LoaderComponent} from "../../../shared/components/loader/loader.component";
import {
  NavigationTrailComponent
} from "../../../shared/components/navbar/components/navigation-trail/navigation-trail.component";
import {
  NavigationTrailService
} from "../../../shared/components/navbar/components/navigation-trail/services/navigation-trail.service";
import {Api} from "../../../shared/services/api.service";
import {ItemService} from "../../../shared/services/item.service";
import {LoaderService} from "../../../shared/services/loader.service";
import {ItemPageParameter} from "../shop-routes";
import {ItemDescriptionComponent} from "./components/item-description/item-description.component";
import {ItemShowcaseComponent} from "./components/item-showcase/item-showcase.component";
import {ItemSummaryComponent} from "./components/item-summary/item-summary.component";
import ItemAggregate = Api.ItemApi.Interfaces.ItemAggregate;
import ItemImage = Api.ItemApi.Interfaces.ItemImage;

@Component({
  selector: "shop-item",
  standalone: true,
  imports: [CommonModule, NavigationTrailComponent, ItemShowcaseComponent, ItemSummaryComponent, ItemDescriptionComponent, LoaderComponent],
  templateUrl: "./shop-item-page.component.html",
  styleUrls: ["./shop-item-page.component.scss"]
})
export class ShopItemPage implements OnInit, OnDestroy {
  item$: Observable<ItemAggregate | undefined> | undefined;
  activeImage: ItemImage | undefined;
  itemImageSub: Subscription | undefined;

  constructor(private itemService: ItemService,
              private activeRoute: ActivatedRoute,
              private trailService: NavigationTrailService,
              public loader: LoaderService) {
  }

  ngOnInit(): void {
    const param = this.activeRoute.snapshot.params[ItemPageParameter.Id];
    this.itemService.initItem(param);
    this.trailService.displayNavigationTrail();
    this.item$ = this.itemService.getItem();
    this.determineActiveImage();
  }

  ngOnDestroy(): void {
    this.trailService.closeNavigationTrail();
    this.itemImageSub?.unsubscribe();
  }

  determineActiveImage(): void {
    this.itemImageSub = this.item$?.subscribe((item: ItemAggregate | undefined): void => {
      if (item?.item.images && item?.item.images.length > 0) {
        this.activeImage = item?.item.images[0];
      }
    });
  }
}
