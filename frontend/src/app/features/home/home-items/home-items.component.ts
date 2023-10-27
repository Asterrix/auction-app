import {Component, OnDestroy, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Observable, Subscription} from "rxjs";
import {HomeItemsTabComponent, Section, SectionQueryParam} from "./components/home-items-tab/home-items-tab.component";
import {ItemCardComponent} from "../../../shared/components/item-card/item-card.component";
import {ActivatedRoute, Params} from "@angular/router";
import {ItemService, ItemSummary} from "../../../shared/services/item.service";

@Component({
  selector: "app-home-items",
  standalone: true,
  imports: [CommonModule, HomeItemsTabComponent, ItemCardComponent],
  templateUrl: "./home-items.component.html",
  styleUrls: ["./home-items.component.scss"]
})
export class HomeItemsComponent implements OnInit, OnDestroy {
  public items$: Observable<ItemSummary[]> = {} as Observable<ItemSummary[]>;
  private _queryParamSub: Subscription | undefined;
  private _queryParam: Section = Section.Default;

  constructor(private itemService: ItemService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this._queryParamSub = this.activatedRoute.queryParams.subscribe((params: Params): void => {
      this._queryParam = params[SectionQueryParam.Section] || Section.Default;

      switch (this._queryParam) {
        case Section.LastChance:
          this.items$ = this.itemService.getItems();
          this.itemService.initItemsLastChance();
          break;
        default:
          this.items$ = this.itemService.getItems();
          this.itemService.initItemsNewArrivals();
      }
    });
  }

  ngOnDestroy(): void {
    if (this._queryParamSub) {
      this._queryParamSub.unsubscribe();
    }
  }
}
