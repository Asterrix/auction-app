import {Component, OnDestroy, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Subscription} from "rxjs";
import {HomeItemsTabComponent, Section, SectionQueryParam} from "./components/home-items-tab/home-items-tab.component";
import {ItemCardComponent} from "../../../shared/components/item-card/item-card.component";
import {Page} from "../../../shared/models/interfaces/page";
import {ActivatedRoute, Params} from "@angular/router";
import {ItemService, ItemSummary} from "../services/item.service";

@Component({
  selector: "app-home-items",
  standalone: true,
  imports: [CommonModule, HomeItemsTabComponent, ItemCardComponent],
  templateUrl: "./home-items.component.html",
  styleUrls: ["./home-items.component.scss"]
})
export class HomeItemsComponent implements OnInit, OnDestroy {
  private _queryParamSub: Subscription | undefined;
  private _queryParam: Section = Section.Default;
  private _items: Array<ItemSummary> = Array<ItemSummary>();

  constructor(private itemService: ItemService, private activatedRoute: ActivatedRoute) {
  }

  get items(): Array<ItemSummary> {
    return this._items;
  }

  ngOnInit(): void {
    this._queryParamSub = this.activatedRoute.queryParams.subscribe((params: Params): void => {
      this._queryParam = params[SectionQueryParam.Section] || Section.Default;
      this._items.length = 0;

      this.loadItems();
    });
  }

  loadItems(): void {
    switch (this._queryParam) {
      case Section.LastChance:
        this.itemService.items$.load(this.itemService.getListOfLastChanceItems());
        break;
      default:
        this.itemService.items$.load(this.itemService.getListOfNewestItems());
    }

    this.itemService.items$.data$.subscribe((items: Page<ItemSummary> | undefined) => {
      if (items) {
        this._items = items.content;
      }
    });
  }

  ngOnDestroy(): void {
    if (this._queryParamSub) {
      this._queryParamSub.unsubscribe();
    }
    this.itemService.items$.unsubscribe();
  }
}
