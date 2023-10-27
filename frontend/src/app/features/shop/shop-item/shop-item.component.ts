import {Component, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NavigationTrailComponent} from "../../../shared/components/navigation-trail/navigation-trail.component";
import {ItemShowcaseComponent} from "./components/item-showcase/item-showcase.component";
import {ItemSummaryComponent} from "./components/item-summary/item-summary.component";
import {ItemInformationComponent} from "./components/item-information/item-information.component";
import {ItemService} from "../../../shared/services/item.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: "app-shop-item",
  standalone: true,
  imports: [CommonModule, NavigationTrailComponent, ItemShowcaseComponent, ItemSummaryComponent, ItemInformationComponent],
  templateUrl: "./shop-item.component.html",
  styleUrls: ["./shop-item.component.scss"]
})
export class ShopItemComponent implements OnInit {
  constructor(private itemService: ItemService, private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.itemService.initItem(this.activeRoute.snapshot.params["id"]);
    this.itemService.getItem();
  }
}
