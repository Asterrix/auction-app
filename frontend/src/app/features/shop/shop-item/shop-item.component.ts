import {Component, OnDestroy, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NavigationTrailComponent} from "../../../shared/components/navigation-trail/navigation-trail.component";
import {ItemShowcaseComponent} from "./components/item-showcase/item-showcase.component";
import {ItemSummaryComponent} from "./components/item-summary/item-summary.component";
import {ItemInformationComponent} from "./components/item-information/item-information.component";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ItemService} from "./services/item.service";
import {Observable, switchMap} from "rxjs";

@Component({
  selector: "app-shop-item",
  standalone: true,
  imports: [CommonModule, NavigationTrailComponent, ItemShowcaseComponent, ItemSummaryComponent, ItemInformationComponent],
  templateUrl: "./shop-item.component.html",
  styleUrls: ["./shop-item.component.scss"]
})
export class ShopItemComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private service: ItemService) {
  }

  ngOnInit(): void {
    this.fetchItem();
  }

  ngOnDestroy(): void {
    this.service.item$.unsubscribe();
  }

  private fetchItem(): void {
    this.service.item$.load(this.route.paramMap.pipe(
      switchMap((param: ParamMap) => {
        const itemId: number = Number(param.get("id"));
        return this.service.getItem(itemId);
      })
    ));
  }
}

