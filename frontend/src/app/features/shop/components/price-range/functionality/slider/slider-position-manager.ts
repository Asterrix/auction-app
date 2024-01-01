import {ElementRef, Injectable} from "@angular/core";
import {PriceRange} from "../../../../../../shared/services/api/item/item.type";
import {PriceRangeSliderDirective} from "../../directive/price-range-slider.directive";
import {PriceRangeSlider} from "./price-range-slider.interface";

@Injectable({
    providedIn: "root"
})
export class SliderPositionManager implements PriceRangeSlider {
    public initializeSliderPositions = async (fromSlide: ElementRef,
                                              toSlide: ElementRef,
                                              sliderDirective: PriceRangeSliderDirective,
                                              priceRange: PriceRange): Promise<void> => {

        // Set initial positions based on min and max limits
        const minLimit: number = priceRange.minPrice;
        const maxLimit: number = priceRange.maxPrice;

        // Set the initial values for display only, not affecting the form values
        await this.setSliderValue(fromSlide, minLimit);
        await this.setSliderValue(toSlide, maxLimit);

        // Fill the slider track with primary color to indicate the selected range of prices
        sliderDirective.fillSliderTrack();
    };

    public setSliderValue = async (slider: ElementRef, value: number): Promise<void> => {
        if (slider && slider.nativeElement) {
            slider.nativeElement.value = value;
        }
    };
}
