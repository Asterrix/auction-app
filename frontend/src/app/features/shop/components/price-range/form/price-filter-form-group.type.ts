import {FormGroup, ɵElement} from "@angular/forms";
import {PriceFilter} from "../filter/price-filter.type";

export type PriceRangeFormGroup = FormGroup<{ [K in keyof PriceFilter]: ɵElement<PriceFilter[K], never> }>;
