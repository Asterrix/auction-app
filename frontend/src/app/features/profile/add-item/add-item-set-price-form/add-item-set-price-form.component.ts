import {CommonModule} from "@angular/common";
import {Component, EventEmitter, inject, Output} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormWrapperComponent} from "../../../../shared/components/forms/form-wrapper/form-wrapper.component";
import {
  ValidationMessageComponent
} from "../../../../shared/components/forms/validation-message/validation-message.component";
import {FormFieldWrapperComponent} from "../shared/form-field-wrapper/form-field-wrapper.component";
import {FormNavigation, FormNavigationHandler} from "../shared/form-navigation-handler";
import {PriceValidation} from "../shared/validation/config/add-item-price-validation.config";
import {AddItemPriceFormService} from "./services/add-item-price-form.service";
import {DateSelectorComponent} from "./form-date-time-selector/date-selector/date-selector.component";
import {FormDateTimeSelectorComponent} from "./form-date-time-selector/form-date-time-selector.component";
import {FormStartPriceComponent} from "./form-start-price/form-start-price.component";

export enum DateTimeForm {
  StartTime,
  EndTime
}

@Component({
  selector: "add-item-set-price-form",
  standalone: true,
  imports: [
    CommonModule,
    FormWrapperComponent,
    ReactiveFormsModule,
    FormsModule,
    FormStartPriceComponent,
    FormDateTimeSelectorComponent,
    FormFieldWrapperComponent,
    ValidationMessageComponent,
    DateSelectorComponent
  ],
  templateUrl: "./add-item-set-price-form.component.html",
  styleUrl: "./add-item-set-price-form.component.scss"
})
export class AddItemSetPriceFormComponent extends FormNavigationHandler implements FormNavigation {
  @Output() override submitForm: EventEmitter<void> = new EventEmitter<void>();
  @Output() override goBack: EventEmitter<void> = new EventEmitter<void>();
  @Output() override cancelForm: EventEmitter<void> = new EventEmitter<void>();
  protected setPriceDateFormService = inject(AddItemPriceFormService);
  protected readonly PriceValidation = PriceValidation;

  public override submitFormEvent(): void {
    if (this.setPriceDateFormService.validateForm()) {
      super.submitFormEvent();
    }
  }

  protected submitDateTimeEvent(date: Date, dateTimeType: DateTimeForm): void {
    if (dateTimeType === DateTimeForm.StartTime) {
      this.setPriceDateFormService.patchStartTime(date);
    } else if (dateTimeType === DateTimeForm.EndTime) {
      this.setPriceDateFormService.patchEndTime(date);
    }
  }

  protected readonly DateTimeForm = DateTimeForm;
}
