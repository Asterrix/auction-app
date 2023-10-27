import {Component, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Item, ItemService} from "../../../../../shared/services/item.service";
import {Observable} from "rxjs";

@Component({
  selector: "app-item-summary",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./item-summary.component.html",
  styleUrls: ["./item-summary.component.scss"]
})
export class ItemSummaryComponent implements OnInit {
  public item$: Observable<Item> = {} as Observable<Item>;

  constructor(private itemService: ItemService) {
  }

  ngOnInit(): void {
    this.item$ = this.itemService.getItem();
  }
}
