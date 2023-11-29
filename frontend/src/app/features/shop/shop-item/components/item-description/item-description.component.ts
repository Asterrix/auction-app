import {CommonModule} from "@angular/common";
import {Component, Input} from "@angular/core";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {Observable} from "rxjs";
import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
import {TabComponent} from "../../../../../shared/components/tab/tab.component";
import {Api} from "../../../../../shared/services/api.service";
import ItemAggregate = Api.ItemApi.Interfaces.ItemAggregate;

@Component({
  selector: "shop-item-description",
  standalone: true,
  imports: [CommonModule, RouterLinkActive, RouterLink, TabComponent, LoaderComponent],
  templateUrl: "./item-description.component.html",
  styleUrls: ["./item-description.component.scss"]
})
export class ItemDescriptionComponent {
  @Input({required: true}) description!: string;
  @Input({required: true}) itemId!: number;
}
