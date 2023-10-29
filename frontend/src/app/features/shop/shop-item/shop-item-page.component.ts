import {CommonModule} from "@angular/common";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {LoaderComponent} from "../../../shared/components/loader/loader.component";
import {
  NavigationTrailComponent
} from "../../../shared/components/navbar/components/navigation-trail/navigation-trail.component";
import {
  NavigationTrailService
} from "../../../shared/components/navbar/components/navigation-trail/services/navigation-trail.service";
import {ItemService} from "../../../shared/services/item.service";
import {LoaderService} from "../../../shared/services/loader.service";
import {ItemPageParameter} from "../shop-routes";
import {ItemInformationComponent} from "./components/item-information/item-information.component";
import {ItemShowcaseComponent} from "./components/item-showcase/item-showcase.component";
import {ItemSummaryComponent} from "./components/item-summary/item-summary.component";

@Component({
  selector: "shop-item",
  standalone: true,
  imports: [CommonModule, NavigationTrailComponent, ItemShowcaseComponent, ItemSummaryComponent, ItemInformationComponent, LoaderComponent],
  templateUrl: "./shop-item-page.component.html",
  styleUrls: ["./shop-item-page.component.scss"]
})
export class ShopItemPage implements OnInit, OnDestroy {
  loader$ = this.loader.loading$;

  constructor(private itemService: ItemService,
              private activeRoute: ActivatedRoute,
              private loader: LoaderService,
              private trailService: NavigationTrailService) {
  }

  ngOnInit(): void {
    this.itemService.initItem(this.activeRoute.snapshot.params[ItemPageParameter.Id]);
    this.trailService.displayNavigationTrail();
    this.itemService.getItem();
  }

  ngOnDestroy(): void {
    this.trailService.closeNavigationTrail();
  }
}
