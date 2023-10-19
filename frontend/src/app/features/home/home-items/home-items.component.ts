import {Component, OnDestroy, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Observable, Subscription} from "rxjs";
import {HomeItemsTabComponent, Section, SectionQueryParam} from "./components/home-items-tab/home-items-tab.component";
import {ItemCardComponent} from "../../../shared/components/item-card/item-card.component";
import {HomeItemsService, Item} from "./services/home-items.service";
import {ScrollNearEndDirective} from "../../../shared/directives/scroll-near-end.directive";
import {Page} from "../../../shared/models/interfaces/page";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: "app-home-items",
  standalone: true,
  imports: [CommonModule, HomeItemsTabComponent, ItemCardComponent, ScrollNearEndDirective],
  templateUrl: "./home-items.component.html",
  styleUrls: ["./home-items.component.scss"]
})
export class HomeItemsComponent implements OnInit, OnDestroy {
  private queryParamSub: Subscription | undefined;
  private itemsObservableSub: Subscription | undefined;
  private _items: Array<Item> = Array<Item>();
  private queryParam: Section = Section.Default;
  private pageNumber: number = 0;
  private _isLastPage: boolean = false;

  constructor(private homeItemsService: HomeItemsService, private activatedRoute: ActivatedRoute) {
  }

  get items(): Array<Item> {
    return this._items;
  }

  get isLastPage(): boolean {
    return this._isLastPage;
  }

  ngOnInit(): void {
    this.queryParamSub = this.activatedRoute.queryParams.subscribe((params: Params): void => {
      this.queryParam = params[SectionQueryParam.Section] || Section.Default;
      this.pageNumber = 0;
      this._items.length = 0;

      this.loadItems();
    });
  }

  loadItems(): void {
    let itemsObservable$: Observable<Page<Item>>;

    switch (this.queryParam) {
      case Section.LastChance:
        itemsObservable$ = this.homeItemsService.getListOfLastChanceItems(this.pageNumber);
        break;
      default:
        itemsObservable$ = this.homeItemsService.getListOfNewestItems(this.pageNumber);
    }

    this.itemsObservableSub = itemsObservable$.subscribe((page: Page<Item>): void => {
      page.content.map((item: Item) => this._items.push(item));
      this._isLastPage = page.last;
    });
  }

  ngOnDestroy(): void {
    if (this.queryParamSub) {
      this.queryParamSub.unsubscribe();
    }
    if (this.itemsObservableSub) {
      this.itemsObservableSub.unsubscribe();
    }
  }

  handleInfiniteScroll() {
    if (!this._isLastPage) {
      this.pageNumber++;
      this.loadItems();
    }
  }
}
