import {CommonModule} from "@angular/common";
import {Component, Input} from "@angular/core";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {Observable} from "rxjs";
import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
import {TabComponent} from "../../../../../shared/components/tab/tab.component";
import {Api} from "../../../../../shared/services/api.service";
import ItemAggregate = Api.ItemApi.Interfaces.ItemAggregate;

@Component({
  selector: "shop-item-information",
  standalone: true,
  imports: [CommonModule, RouterLinkActive, RouterLink, TabComponent, LoaderComponent],
  templateUrl: "./item-information.component.html",
  styleUrls: ["./item-information.component.scss"]
})
export class ItemInformationComponent {
  @Input({required: true}) public item$: Observable<ItemAggregate | undefined> | undefined;
}
