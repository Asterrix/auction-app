import {computed, Injectable, Signal, signal, WritableSignal} from "@angular/core";
import {ItemLayout} from "src/app/shared/components/item-card/directive/item.layout.type";
import {ItemLayoutConfig} from "./item-layout.config.interface";

@Injectable({
  providedIn: "root"
})
export class ItemLayoutSetting implements ItemLayoutConfig {
  private readonly storageKey: string = "item-layout";
  private readonly defaultItemLayout: ItemLayout = "grid";

  private itemLayoutSignal: WritableSignal<ItemLayout> = signal<ItemLayout>(this.defaultItemLayout);
  public readonly itemLayout: Signal<ItemLayout> = computed(() => this.itemLayoutSignal());

  constructor() {
    this.getItemLayoutFromLocalStorage().then((result: ItemLayout) => this.setItemLayout(result));
  }

  public setItemLayout = async (itemLayout: ItemLayout): Promise<void> => {
    const isValidItemLayout: boolean = await this.isValidItemLayout(itemLayout);

    if (!isValidItemLayout) {
      itemLayout = this.defaultItemLayout;
    }

    localStorage.setItem(this.storageKey, itemLayout);

    this.itemLayoutSignal.set(itemLayout);
  };

  private getItemLayoutFromLocalStorage = async (): Promise<ItemLayout> => {
    const itemLayout: ItemLayout = localStorage.getItem(this.storageKey) as ItemLayout;

    if (itemLayout !== "grid" && itemLayout !== "list") {
      return this.defaultItemLayout;
    }

    return itemLayout;
  };

  private isValidItemLayout = async (itemLayout: ItemLayout): Promise<boolean> => {
    return itemLayout === "grid" || itemLayout === "list";
  };
}
