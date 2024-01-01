import {PriceRangeFormManager} from "./functionality/form/price-range-form-manager.interface";
import {PriceRangeValueHandler} from "./functionality/price/price-range-value-handler.interface";
import {PriceRangeSlider} from "./functionality/slider/price-range-slider.interface";

export interface PriceRangeSelector extends PriceRangeSlider, PriceRangeValueHandler, PriceRangeFormManager {
}
