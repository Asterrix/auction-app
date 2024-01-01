import {CommonModule} from "@angular/common";
import {AfterContentInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {debounceTime, firstValueFrom, Observable, Subject, take, takeUntil} from "rxjs";
import {distinctUntilChanged} from "rxjs/operators";
import {InputFieldComponent} from "../../../../shared/components/forms/input-field/input-field.component";
import {PriceRange} from "../../../../shared/services/api/item/item.type";
import {NewApiService} from "../../../../shared/services/api/new-api.service";
import {clearQueryParams} from "../../../../shared/utils/query-param.helper";
import {
  FormFieldWrapperComponent
} from "../../../profile/add-item/shared/form-field-wrapper/form-field-wrapper.component";
import {PriceRangeSliderDirective} from "./directive/price-range-slider.directive";
import {PriceRangeQueryService} from "./filter/price-range-query.service";
import {PriceRangeFormGroup} from "./functionality/form/price-range-form-group.type";
import {PriceRangeSettingsManager} from "./functionality/form/price-range-settings-manager";
import {PriceRangeValueManager} from "./functionality/price/price-range-value-manager";
import {SliderPositionManager} from "./functionality/slider/slider-position-manager";
import {PriceRangeSelector} from "./price-range-selector.interface";
import {PriceRangeForm} from "./type/price-range.type";


@Component({
  selector: "app-price-range-selector",
  standalone: true,
  imports: [
    CommonModule,
    FormFieldWrapperComponent,
    InputFieldComponent,
    ReactiveFormsModule,
    FormsModule,
    PriceRangeSliderDirective,
  ],
  templateUrl: "./price-range-selector.component.html",
  styleUrl: "./price-range.component.scss"
})
export class PriceRangeSelectorComponent implements OnInit, OnDestroy, AfterContentInit, PriceRangeSelector {
  // Directives
  @ViewChild("fromSlider", {static: true}) fromSlide!: ElementRef;
  @ViewChild("toSlider", {static: true}) toSlide!: ElementRef;
  @ViewChild("sliderTrack", {static: true}) slideTrack!: ElementRef;
  @ViewChild(PriceRangeSliderDirective, {static: true}) sliderDirective!: PriceRangeSliderDirective;

  // Form
  public readonly form: PriceRangeFormGroup;

  // Memory management
  private destroy$ = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly apiService: NewApiService,
    protected readonly priceRangeQueryService: PriceRangeQueryService,
    private readonly sliderPositionManager: SliderPositionManager,
    private readonly priceRangeSettingsManager: PriceRangeSettingsManager,
    private readonly priceRangeValueManager: PriceRangeValueManager
  ) {
    this.form = this.priceRangeSettingsManager.form;
  }

  public async ngOnInit(): Promise<void> {
    await this.setPriceRangeLimit();
    this.subscribeToFormValueChanges();
  }

  public async ngAfterContentInit(): Promise<void> {
    await this.setPriceRangeLimit();
    await this.initializePriceRange();
  }

  public async ngOnDestroy(): Promise<void> {
    this.destroy$.next();
    this.destroy$.complete();
    await this.resetFormValues();
    await this.resetFilter();
    await clearQueryParams(this.router);
  };

  public setPriceRangeLimit = async (): Promise<void> => {
    const source: Observable<PriceRange> = this.apiService.itemApi.priceInfo().pipe(take(1));
    const priceInfo: PriceRange = await firstValueFrom(source);
    this.priceRangeQueryService.setPriceRangeLimit(priceInfo);
  };

  public resetFilter = async (): Promise<void> => {
    await this.priceRangeQueryService.resetFilter();
  };

  public initializeSliderPositions = async (): Promise<void> => {
    await this.sliderPositionManager.initializeSliderPositions(
      this.fromSlide,
      this.toSlide,
      this.sliderDirective,
      this.priceRangeQueryService.priceRangeLimit()
    );
  };

  public resetFormValues = async (): Promise<void> => {
    await this.priceRangeSettingsManager.resetFormValues();
  };

  public updateFormValues = async (priceRange: PriceRangeForm): Promise<void> => {
    await this.priceRangeSettingsManager.updateFormValues(priceRange);
  };

  public handlePriceChange = async (): Promise<boolean> => {
    const priceRangeForm: PriceRangeForm = {
      minPrice: this.form.value.minPrice!,
      maxPrice: this.form.value.maxPrice!
    };

    const priceFilterValues: PriceRangeForm = this.priceRangeQueryService.priceRange();
    const priceChanged: boolean = await this.priceRangeValueManager.handlePriceChange(priceRangeForm, priceFilterValues);

    if (priceChanged) {
      const newPriceRange: PriceRangeForm = this.priceRangeQueryService.priceRange();
      await this.updateFormValues(newPriceRange);
      this.sliderDirective.fillSliderTrack();

      if (newPriceRange.minPrice === null && newPriceRange.maxPrice === null) {
        await this.initializeSliderPositions();
        await clearQueryParams(this.router);
      }
    }

    return priceChanged;
  };

  public initializePriceRange = async (): Promise<boolean> => {
    const priceRangeInitialized: boolean = await this.priceRangeValueManager.initializePriceRange(this.activatedRoute);

    if (priceRangeInitialized) {
      await this.updateFormValues(this.priceRangeQueryService.priceRange());

      await this.setSliderValue(this.fromSlide, this.priceRangeQueryService.priceRange().minPrice!);
      await this.setSliderValue(this.toSlide, this.priceRangeQueryService.priceRange().maxPrice!);
      this.sliderDirective.fillSliderTrack();

    } else {
      await this.initializeSliderPositions();
    }

    return priceRangeInitialized;
  };

  public setSliderValue = async (slider: ElementRef, value: number): Promise<void> => {
    await this.sliderPositionManager.setSliderValue(slider, value);
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
