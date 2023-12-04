import {CommonModule} from "@angular/common";
import {Component, EventEmitter, inject, Output} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {FormWrapperComponent} from "../../../../shared/components/forms/form-wrapper/form-wrapper.component";
import {InputFieldComponent} from "../../../../shared/components/forms/input-field/input-field.component";
import {
  ValidationMessageComponent
} from "../../../../shared/components/forms/validation-message/validation-message.component";
import {FormFieldWrapperComponent} from "../shared/form-field-wrapper/form-field-wrapper.component";
import {FormMemberComponent} from "../shared/form-member/form-member.component";
import {FormNavigationHandler} from "../shared/form-navigation-handler";
import {BasicFormValidation} from "../shared/validation/config/add-item-basic-form-validation-config";
import {AddItemBasicFormService} from "./add-item-basic-form.service";
import {CategorySelection, FormCategoriesComponent} from "./form-categories/form-categories.component";
import {FormImagesComponent} from "./form-images/form-images.component";
import {FormTextAreaComponent} from "./form-text-area/form-text-area.component";

@Component({
  selector: "add-item-basic-form",
  standalone: true,
  imports: [
    CommonModule,
    InputFieldComponent,
    FormWrapperComponent,
    FormCategoriesComponent,
    FormTextAreaComponent,
    FormImagesComponent,
    FormMemberComponent,
    ReactiveFormsModule,
    ValidationMessageComponent,
    FormFieldWrapperComponent
  ],
  templateUrl: "./add-item-basic-form.component.html",
  styleUrls: ["./add-item-basic-form.component.scss"]
})
export class AddItemBasicFormComponent extends FormNavigationHandler {
  @Output() override submitForm = new EventEmitter<void>();
  @Output() override goBack = new EventEmitter<void>();
  @Output() override cancelForm = new EventEmitter<void>();
  protected addItemForm = inject(AddItemBasicFormService);
  protected formControls = this.addItemForm.form.controls;
  protected readonly BasicFormValidation = BasicFormValidation;

  public override submitFormEvent(): void {
    if (this.addItemForm.validateForm()) {
      super.submitFormEvent();
    }
  }

  protected async addImage($event: Event): Promise<void> {
    await this.addItemForm.addImage($event);
  }

  protected removeImage(image: string): void {
    this.addItemForm.removeImage(image);
  }

  protected updateCategorySelection(category: CategorySelection): void {
    this.addItemForm.updateCategory(category);
  }
}
