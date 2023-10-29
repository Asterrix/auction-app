import {CommonModule} from "@angular/common";
import {Component, OnInit} from "@angular/core";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {Observable} from "rxjs";
import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
import {TabComponent} from "../../../../../shared/components/tab/tab.component";
import {Api} from "../../../../../shared/services/api.service";
import {ItemService} from "../../../../../shared/services/item.service";
import Item = Api.ItemApi.Interfaces.Item;

@Component({
  selector: "shop-item-information",
  standalone: true,
  imports: [CommonModule, RouterLinkActive, RouterLink, TabComponent, LoaderComponent],
  templateUrl: "./item-information.component.html",
  styleUrls: ["./item-information.component.scss"]
})
export class ItemInformationComponent implements OnInit {
  public item$: Observable<Item | undefined> | undefined;

  constructor(private itemService: ItemService) {
  }

  ngOnInit(): void {
    this.item$ = this.itemService.getItem();
  }
}
