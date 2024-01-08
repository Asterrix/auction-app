import {CommonModule} from "@angular/common";
import {Component, OnDestroy, OnInit, Signal, ViewEncapsulation} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSliderModule} from "@angular/material/slider";
import {ActivatedRoute} from "@angular/router";
import {debounceTime, firstValueFrom, Observable, Subject, take, takeUntil} from "rxjs";
import {distinctUntilChanged} from "rxjs/operators";
import {InputFieldComponent} from "../../../../shared/components/forms/input-field/input-field.component";
import {PriceRange} from "../../../../shared/services/api/item/item.type";
import {NewApiService} from "../../../../shared/services/api/new-api.service";
import {ItemFilterService} from "../../../../shared/services/item/item-filter.service";
import {
  FormFieldWrapperComponent
} from "../../../profile/add-item/shared/form-field-wrapper/form-field-wrapper.component";
import {PriceFilter} from "./filter/price-filter.type";
import {PriceRangeFormGroup} from "./form/price-filter-form-group.type";
import {PriceFilterFormService} from "./form/price-filter-form.service";
import {PriceRangeValueService} from "./price/price-range-value.service";


@Component({
  selector: "app-price-range-selector",
  standalone: true,
  imports: [
    CommonModule,
    FormFieldWrapperComponent,
    InputFieldComponent,
    ReactiveFormsModule,
    FormsModule,
    MatSliderModule,
  ],
  templateUrl: "./price-range-selector.component.html",
  styleUrl: "./price-range-selector.component.scss",
  encapsulation: ViewEncapsulation.None
})
export class PriceRangeSelectorComponent implements OnInit, OnDestroy {
  // Form
  public readonly form: PriceRangeFormGroup;

  // Limiter
  protected priceRangeLimit: Signal<PriceFilter>;

  // Memory management
  private destroy$ = new Subject<void>();

  // To avoid slider not being properly presented visually, the slider is hidden until the price range limit is set.
  protected priceRangeInitialized: boolean = false;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly apiService: NewApiService,
    protected readonly itemFilterService: ItemFilterService,
    private readonly priceRangeForm: PriceFilterFormService,
    private readonly priceRangeValueService: PriceRangeValueService
  ) {
    this.form = this.priceRangeForm.form;
    this.priceRangeLimit = this.itemFilterService.priceRangeLimit;
  }

  public async ngOnInit(): Promise<void> {
    await this.setPriceRangeLimit();
    await this.initializePriceRange();
    this.priceRangeInitialized = true;
    this.subscribeToFormValueChanges();
  }

  public async ngOnDestroy(): Promise<void> {
    // Unsubscribe from all subscriptions
    this.destroy$.next();
    this.destroy$.complete();

    // Reset form values
    await this.resetFormValues();
  };

  /*
  * Fetches the price range limit from the API and sets it in the price range query service.
  * This is necessary because the price range limit is not known at compile time.
  * */
  public setPriceRangeLimit = async (): Promise<void> => {
    const source: Observable<PriceRange> = this.apiService.itemApi.priceInfo().pipe(take(1));
    const priceInfo: PriceRange = await firstValueFrom(source);
    this.itemFilterService.setPriceRangeLimit(priceInfo);
  };

  public resetFormValues = async (): Promise<void> => {
    await this.priceRangeForm.resetFormValues();
  };

  public updateFormValues = async (priceRange: PriceFilter): Promise<void> => {
    await this.priceRangeForm.updateFormValues(priceRange);
  };

  public handlePriceChange = async (): Promise<boolean> => {
    const priceRangeForm: PriceFilter = {
      minPrice: this.form.value.minPrice!,
      maxPrice: this.form.value.maxPrice!
    };

    const priceFilterValues: PriceFilter = this.itemFilterService.priceFilter();
    const priceChanged: boolean = await this.priceRangeValueService.handlePriceChange(priceRangeForm, priceFilterValues);

    if (priceChanged) {
      const newPriceRange: PriceFilter = this.itemFilterService.priceFilter();
      await this.updateFormValues(newPriceRange);

      if (newPriceRange.minPrice === null && newPriceRange.maxPrice === null) {
        await this.itemFilterService.resetPriceFilter(true);
      }
    }

    return priceChanged;
  };

  public initializePriceRange = async (): Promise<boolean> => {
    const priceRangeInitialized: boolean = await this.priceRangeValueService.initializePriceRange(this.activatedRoute);

    if (priceRangeInitialized) {
      await this.updateFormValues(this.itemFilterService.priceFilter());
    }

    return priceRangeInitialized;
  };

  private subscribeToFormValueChanges(): void {
    this.form.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      ).subscribe(async () => {
      await this.handlePriceChange();
    });
  }
}
