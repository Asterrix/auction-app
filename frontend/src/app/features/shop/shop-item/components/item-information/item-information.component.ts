import {Component, OnDestroy, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {TabComponent} from "../../../../../shared/components/tab/tab.component";
import {Item, ItemService} from "../../services/item.service";

@Component({
  selector: "app-item-information",
  standalone: true,
  imports: [CommonModule, RouterLinkActive, RouterLink, TabComponent],
  templateUrl: "./item-information.component.html",
  styleUrls: ["./item-information.component.scss"]
})
export class ItemInformationComponent implements OnInit, OnDestroy {
  description: string | undefined;

  constructor(private itemService: ItemService) {
  }

  ngOnInit(): void {
    this.itemService.item$.data$.subscribe((item: Item | undefined) => {
      this.description = item?.description;
    });
  }

  ngOnDestroy(): void {
    this.itemService.item$.unsubscribe();
  }
}
