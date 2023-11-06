import {CommonModule} from "@angular/common";
import {Component, Input} from "@angular/core";
import {Observable} from "rxjs";
import {Api} from "../../../../../shared/services/api.service";
import ItemAggregate = Api.ItemApi.Interfaces.ItemAggregate;

@Component({
  selector: "shop-item-summary",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./item-summary.component.html",
  styleUrls: ["./item-summary.component.scss"]
})
export class ItemSummaryComponent {
  @Input({required: true}) public item$: Observable<ItemAggregate | undefined> | undefined;
}
