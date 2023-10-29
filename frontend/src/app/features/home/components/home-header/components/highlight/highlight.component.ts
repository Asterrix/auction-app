import {CommonModule} from "@angular/common";
import {Component, OnInit} from "@angular/core";
import {RouterLink} from "@angular/router";
import {Observable} from "rxjs";
import {Api} from "../../../../../../shared/services/api.service";
import {ItemService} from "../../../../../../shared/services/item.service";
import FeaturedItem = Api.ItemApi.Interfaces.FeaturedItem;

@Component({
  selector: "home-header-highlight",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./highlight.component.html",
  styleUrls: ["./highlight.component.scss"]
})
export class HighlightComponent implements OnInit {
  item$: Observable<FeaturedItem | undefined> | undefined;

  constructor(private itemService: ItemService) {
  }

  ngOnInit(): void {
    this.item$ = this.itemService.getFeaturedItem();
    this.itemService.initFeaturedItem();
  }
}
