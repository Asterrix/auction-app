import {CommonModule} from "@angular/common";
import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {Api} from "../../../../../shared/services/api.service";
import {ItemService} from "../../../../../shared/services/item.service";
import Item = Api.ItemApi.Interfaces.Item;

@Component({
  selector: "shop-item-summary",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./item-summary.component.html",
  styleUrls: ["./item-summary.component.scss"]
})
export class ItemSummaryComponent implements OnInit {
  public item$: Observable<Item | undefined> | undefined;

  constructor(private itemService: ItemService) {
  }

  ngOnInit(): void {
    this.item$ = this.itemService.getItem();
  }
}
