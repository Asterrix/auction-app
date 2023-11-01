import {CommonModule} from "@angular/common";
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {NavigationTrailComponent} from "../../../shared/components/navigation-trail/navigation-trail.component";
import {ItemService} from "../../../shared/services/item.service";
import {ItemPageParameter} from "../shop-routes";
import {ItemInformationComponent} from "./components/item-information/item-information.component";
import {ItemShowcaseComponent} from "./components/item-showcase/item-showcase.component";
import {ItemSummaryComponent} from "./components/item-summary/item-summary.component";

@Component({
  selector: "shop-item",
  standalone: true,
  imports: [CommonModule, NavigationTrailComponent, ItemShowcaseComponent, ItemSummaryComponent, ItemInformationComponent],
  templateUrl: "./shop-item-page.component.html",
  styleUrls: ["./shop-item-page.component.scss"]
})
export class ShopItemPage implements OnInit {
  constructor(private itemService: ItemService, private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.itemService.initItem(this.activeRoute.snapshot.params[ItemPageParameter.Id]);
    this.itemService.getItem();
  }
}
