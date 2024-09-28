import {Component, OnDestroy, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FeaturedItem, ItemService} from "../../../services/item.service";
import {ApiService} from "../../../../../shared/services/api.service";

@Component({
  selector: "app-home-header-highlight",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./home-header-highlight.component.html",
  styleUrls: ["./home-header-highlight.component.scss"]
})
export class HomeHeaderHighlightComponent implements OnInit, OnDestroy {
  constructor(private itemService: ItemService, private apiService: ApiService) {
  }

  private _item: FeaturedItem | undefined;

  get item(): FeaturedItem | undefined {
    return this._item;
  }

  ngOnInit(): void {
    this.itemService.item$.data$ = this.apiService.getFeaturedItem();

    this.itemService.item$.data$.subscribe((value: FeaturedItem | undefined) => {
      this._item = value;
    });
  }

  ngOnDestroy(): void {
    this.itemService.item$.unsubscribe();
  }
}
