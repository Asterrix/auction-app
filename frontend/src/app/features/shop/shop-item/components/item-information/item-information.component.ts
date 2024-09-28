import {Component, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {TabComponent} from "../../../../../shared/components/tab/tab.component";
import {Item, ItemService} from "../../../../../shared/services/item.service";
import {Observable} from "rxjs";

@Component({
  selector: "app-item-information",
  standalone: true,
  imports: [CommonModule, RouterLinkActive, RouterLink, TabComponent],
  templateUrl: "./item-information.component.html",
  styleUrls: ["./item-information.component.scss"]
})
export class ItemInformationComponent implements OnInit {
  public item$: Observable<Item> = {} as Observable<Item>;

  constructor(private itemService: ItemService) {
  }

  ngOnInit(): void {
    this.item$ = this.itemService.getItem();
  }
}
