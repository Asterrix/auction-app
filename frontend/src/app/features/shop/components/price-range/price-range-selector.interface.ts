import {PriceRangeFormManager} from "./functionality/form/price-range-form-manager.interface";
import {PriceRangeValueHandler} from "./functionality/price/price-range-value-handler.interface";

export interface PriceRangeSelector extends PriceRangeValueHandler, PriceRangeFormManager {
}
