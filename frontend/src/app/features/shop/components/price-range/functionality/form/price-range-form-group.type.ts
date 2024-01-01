import {FormGroup, ɵElement} from "@angular/forms";
import {PriceRangeForm} from "../../type/price-range.type";

export type PriceRangeFormGroup = FormGroup<{ [K in keyof PriceRangeForm]: ɵElement<PriceRangeForm[K], never> }>;
