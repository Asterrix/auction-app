import {Component, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FeaturedItem, ItemService} from "../../../../../shared/services/item.service";
import {Observable} from "rxjs";

@Component({
  selector: "app-home-header-highlight",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./home-header-highlight.component.html",
  styleUrls: ["./home-header-highlight.component.scss"]
})
export class HomeHeaderHighlightComponent implements OnInit {
  public item$: Observable<FeaturedItem | undefined> | undefined;

  constructor(private itemService: ItemService) {
  }

  ngOnInit(): void {
    this.item$ = this.itemService.getFeaturedItem();
    this.itemService.initFeaturedItem();
  }
}
