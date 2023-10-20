import {Component, OnDestroy, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Observable, Subscription} from "rxjs";
import {HomeItemsTabComponent, Section, SectionQueryParam} from "./components/home-items-tab/home-items-tab.component";
import {ItemCardComponent} from "../../../shared/components/item-card/item-card.component";
import {HomeItemsService, ItemSummary} from "./services/home-items.service";
import {Page} from "../../../shared/models/interfaces/page";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: "app-home-items",
  standalone: true,
  imports: [CommonModule, HomeItemsTabComponent, ItemCardComponent],
  templateUrl: "./home-items.component.html",
  styleUrls: ["./home-items.component.scss"]
})
export class HomeItemsComponent implements OnInit, OnDestroy {
  private _queryParamSub: Subscription | undefined;
  private _itemsObservableSub: Subscription | undefined;
  private _queryParam: Section = Section.Default;

  constructor(private homeItemsService: HomeItemsService, private activatedRoute: ActivatedRoute) {
  }

  private _items: Array<ItemSummary> = Array<ItemSummary>();

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
    let itemsObservable$: Observable<Page<ItemSummary>>;

    switch (this._queryParam) {
      case Section.LastChance:
        itemsObservable$ = this.homeItemsService.getListOfLastChanceItems();
        break;
      default:
        itemsObservable$ = this.homeItemsService.getListOfNewestItems();
    }

    this._itemsObservableSub = itemsObservable$.subscribe((page: Page<ItemSummary>): void => {
      page.content.map((item: ItemSummary) => this._items.push(item));
    });
  }

  ngOnDestroy(): void {
    if (this._queryParamSub) {
      this._queryParamSub.unsubscribe();
    }
    if (this._itemsObservableSub) {
      this._itemsObservableSub.unsubscribe();
    }
  }
}
