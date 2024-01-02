import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, Signal} from "@angular/core";
import {ItemLayout} from "../../../../shared/components/item-card/directive/item.layout.type";
import {ActiveElementDirective} from "../../../../shared/directives/active-element.directive";
import {ItemLayoutConfig} from "../../../../shared/services/user/settings/item-layout/item-layout.config.interface";
import {UserSetting} from "../../../../shared/services/user/settings/user-setting.service";
import {SortItemsComponent} from "../sort-items/sort-items.component";

@Component({
  selector: "shop-sorting-tab",
  standalone: true,
  imports: [CommonModule, SortItemsComponent, NgOptimizedImage, ActiveElementDirective],
  templateUrl: "./sorting-tab.component.html",
  styleUrl: "./sorting-tab.component.scss"
})
export class SortingTabComponent implements ItemLayoutConfig {
  public itemLayout: Signal<ItemLayout>;

  constructor(private readonly userSetting: UserSetting) {
    this.itemLayout = this.userSetting.itemLayout;
  }


  public setItemLayout = async (itemLayout: ItemLayout): Promise<void> => {
    await this.userSetting.setItemLayout(itemLayout);
  };
}
