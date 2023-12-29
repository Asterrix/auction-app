import {CommonModule} from "@angular/common";
import {Component, Input} from "@angular/core";
import {RouterLink} from "@angular/router";
import {Category} from "../../../../../../shared/services/api/category/category.type";
import {ShopRouteEndpoint} from "../../../../../shop/shop-routes";


@Component({
  selector: "home-header-sidebar",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent {
  @Input({required: true}) categories!: Category[];
  protected readonly ShopRouteEndpoint = ShopRouteEndpoint;
}
