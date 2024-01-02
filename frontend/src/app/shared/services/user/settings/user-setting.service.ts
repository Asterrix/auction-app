import {Injectable, Signal} from "@angular/core";
import {ItemLayout} from "../../../components/item-card/directive/item.layout.type";
import {ItemLayoutSetting} from "./item-layout/item-layout-setting.service";
import {UserSettingConfig} from "./user-setting-config.interface";

@Injectable({
  providedIn: "root"
})
export class UserSetting implements UserSettingConfig {
  public itemLayout: Signal<ItemLayout>;

  constructor(private readonly ItemLayoutSetting: ItemLayoutSetting) {
    this.itemLayout = this.ItemLayoutSetting.itemLayout;
  }

  public setItemLayout = async (itemLayout: ItemLayout): Promise<void> => {
    await this.ItemLayoutSetting.setItemLayout(itemLayout);
  };
}
