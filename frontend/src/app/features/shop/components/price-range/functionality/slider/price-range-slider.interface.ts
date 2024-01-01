import {ElementRef} from "@angular/core";
import {PriceRange} from "../../../../../../shared/services/api/item/item.type";
import {PriceRangeSliderDirective} from "../../directive/price-range-slider.directive";

export interface PriceRangeSlider {
  initializeSliderPositions: (
    fromSlide: ElementRef,
    toSlide: ElementRef,
    sliderDirective: PriceRangeSliderDirective,
    priceRange: PriceRange
  ) => Promise<void>;

  setSliderValue: (slider: ElementRef, value: number) => Promise<void>;
}
