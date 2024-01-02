import {CommonModule} from "@angular/common";
import {Component, Input, Signal} from "@angular/core";
import {Router, RouterLink} from "@angular/router";
import {ItemLayoutDirective} from "../../../../shared/components/item-card/directive/item-layout.directive";
import {ItemLayout} from "../../../../shared/components/item-card/directive/item.layout.type";
import {ItemCardComponent} from "../../../../shared/components/item-card/item-card.component";
import {LoaderComponent} from "../../../../shared/components/loader/loader.component";
import {Page} from "../../../../shared/models/pagination.service";
import {ItemSummary} from "../../../../shared/services/api/item/item.interface";
import {UserSetting} from "../../../../shared/services/user/settings/user-setting.service";
import {ShopRouteEndpoint} from "../../shop-routes";

@Component({
  selector: "shop-content-section",
  standalone: true,
  imports: [
    CommonModule,
    ItemCardComponent,
    RouterLink,
    LoaderComponent,
    ItemLayoutDirective
  ],
  templateUrl: "./content-section.component.html",
  styleUrls: ["./content-section.component.scss"]
})
export class ContentSectionComponent {
  @Input({required: true}) items!: ItemSummary[];
  @Input({required: true}) pagination!: Page;
  protected itemLayout: Signal<ItemLayout>;

  constructor(
    private readonly router: Router,
    private readonly userSettingsService: UserSetting
  ) {
    this.itemLayout = this.userSettingsService.itemLayout;
  }

  navigateToItem = async (itemId: number): Promise<void> => {
    await this.router.navigate(["/", ShopRouteEndpoint.Shop, ShopRouteEndpoint.Item, itemId]);
  };
}
