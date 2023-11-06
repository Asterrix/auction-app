import {CommonModule} from "@angular/common";
import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {ItemCardComponent} from "../../../../shared/components/item-card/item-card.component";
import {LoaderComponent} from "../../../../shared/components/loader/loader.component";
import {Page} from "../../../../shared/models/interfaces/page";
import {LoaderService} from "../../../../shared/services/loader.service";
import {Api} from "../../../../shared/services/api.service";
import {SectionTabComponent} from "./components/section-tab/section-tab.component";
import ItemSummary = Api.ItemApi.Interfaces.ItemSummary;

@Component({
  selector: "home-items",
  standalone: true,
  imports: [CommonModule, SectionTabComponent, ItemCardComponent, LoaderComponent],
  templateUrl: "./home-items.component.html",
  styleUrls: ["./home-items.component.scss"]
})
export class HomeItemsComponent {
  @Input({required: true}) items$: Observable<Page<ItemSummary> | undefined> | undefined;

  constructor(private router: Router, public loader: LoaderService) {
  }

  navigateToItem(itemId: number): void {
    this.router.navigate(["/shop/item", itemId]).then(null);
  }
}
