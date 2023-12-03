import {CommonModule} from "@angular/common";
import {Component, inject} from "@angular/core";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {FormWrapperComponent} from "../../../../shared/components/forms/form-wrapper/form-wrapper.component";
import {InputFieldComponent} from "../../../../shared/components/forms/input-field/input-field.component";
import {
  ValidationMessageComponent
} from "../../../../shared/components/forms/validation-message/validation-message.component";
import {FormMemberComponent} from "../shared/form-member/form-member.component";
import {FormFieldWrapperComponent} from "../shared/./form-field-wrapper/form-field-wrapper.component";
import {FormFieldValidator} from "../shared/validation/formFieldValidator";
import {CategorySelection, CategoryType, FormCategoriesComponent} from "./form-categories/form-categories.component";
import {FormImagesComponent} from "./form-images/form-images.component";
import {FormTextAreaComponent} from "./form-text-area/form-text-area.component";
import {ImageService} from "./services/image.service";
import {CategoryValidation} from "./validation/category-validation";
import {DescriptionValidation} from "./validation/description-validation";
import {ImageValidation} from "./validation/image-validation";
import {ItemNameValidation} from "./validation/item-name.validation";

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
export class AddItemBasicFormComponent {
  protected itemImages: string[] = [];
  private imageService: ImageService = inject(ImageService);
  private formBuilder: FormBuilder = inject(FormBuilder);

  protected addItemBasicForm = this.formBuilder.nonNullable.group({
    itemName: [""],
    category: [""],
    subcategory: [""],
    description: [""],
    photos: [this.itemImages],
  });

  protected formControls = this.addItemBasicForm.controls;

  protected validation = new FormFieldValidator<string | string[]>([
    {formControl: this.formControls.itemName, validator: new ItemNameValidation()},
    {formControl: this.formControls.description, validator: new DescriptionValidation()},
    {formControl: this.formControls.photos, validator: new ImageValidation()},
    {formControl: this.formControls.category, validator: new CategoryValidation(CategoryType.Category)},
    {formControl: this.formControls.subcategory, validator: new CategoryValidation(CategoryType.Subcategory)},
  ]);

  protected async addImage($event: Event): Promise<void> {
    let files: FileList | undefined | null;

    if ($event instanceof DragEvent) {
      files = $event.dataTransfer?.files;
    } else if ($event.target instanceof HTMLInputElement) {
      files = $event.target.files;
    }

    if (files) {
      const newImages: string[] = await this.imageService.addImage(files);
      this.itemImages = this.imageService.filterDuplicates(this.itemImages, newImages);

      this.addItemBasicForm.patchValue({
        photos: this.itemImages
      });
    }
  }

  protected removeImage(image: string): void {
    this.itemImages = this.imageService.removeImage(this.itemImages, image);

    this.addItemBasicForm.patchValue({
      photos: this.itemImages
    });
  }

  protected updateCategorySelection(category: CategorySelection): void {
    if (category.type === CategoryType.Category && this.addItemBasicForm.value.category !== category.value) {
      this.addItemBasicForm.patchValue({
        category: category.value
      });
    } else if (category.type === CategoryType.Subcategory && this.addItemBasicForm.value.subcategory !== category.value) {
      this.addItemBasicForm.patchValue({
        subcategory: category.value
      });
    }
  }

  public submitForm(): void {
    this.validation.validateAllFormFields();
  }
}
