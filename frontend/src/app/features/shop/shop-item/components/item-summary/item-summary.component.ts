import {Component, OnDestroy, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ItemService} from "../../services/item.service";

export interface ItemSummary {
  name: string;
  startingPrice: number;
  highestBid: number;
  numberBids: number;
  timeLeft: string;
}

@Component({
  selector: "app-item-summary",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./item-summary.component.html",
  styleUrls: ["./item-summary.component.scss"]
})
export class ItemSummaryComponent implements OnInit, OnDestroy {
  itemSummary: ItemSummary | undefined;

  constructor(private itemService: ItemService) {
  }

  ngOnInit(): void {
    this.itemService.item$.data$.subscribe(value => {
      if (value) {
        this.itemSummary = {
          name: value.name,
          startingPrice: value.initialPrice,
          numberBids: 0, // placeholder
          highestBid: 0, // placeholder
          timeLeft: value.timeLeft
        };
      }
    });
  }

  ngOnDestroy(): void {
    this.itemService.item$.unsubscribe();
  }
}
