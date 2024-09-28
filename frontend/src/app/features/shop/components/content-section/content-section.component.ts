import {CommonModule} from "@angular/common";
import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Router, RouterLink} from "@angular/router";
import {Observable} from "rxjs";
import {ItemCardComponent} from "../../../../shared/components/item-card/item-card.component";
import {LoaderComponent} from "../../../../shared/components/loader/loader.component";
import {Page} from "../../../../shared/models/interfaces/page";
import {Pagination} from "../../../../shared/models/pagination";
import {Api} from "../../../../shared/services/api.service";
import {LoaderService} from "../../../../shared/services/loader.service";
import ItemSummary = Api.ItemApi.Interfaces.ItemSummary;

@Component({
  selector: "shop-content-section",
  standalone: true,
  imports: [CommonModule, ItemCardComponent, RouterLink, LoaderComponent],
  templateUrl: "./content-section.component.html",
  styleUrls: ["./content-section.component.scss"]
})
export class ContentSectionComponent {
  @Input({required: true}) items$: Observable<Page<ItemSummary> | undefined> | undefined;
  @Input({required: true}) pagination!: Pagination;
  @Output() increasePageSize: EventEmitter<void> = new EventEmitter<void>();

  constructor(private router: Router, public loader: LoaderService) {
  }

  loadMoreElements(): void {
    this.increasePageSize.emit();
  }

  navigateToItem(itemId: number): void {
    this.router.navigate(["/shop/item", itemId]).then(null);
  }
}
