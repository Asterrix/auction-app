import {Signal} from "@angular/core";
import {ItemLayout} from "src/app/shared/components/item-card/directive/item.layout.type";

export interface ItemLayoutConfig {
  itemLayout: Signal<ItemLayout>;
  setItemLayout: (itemLayout: ItemLayout) => void;
}
