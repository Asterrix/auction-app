import {computed, inject, Injectable, Signal, signal, WritableSignal} from "@angular/core";
import {FormBuilder, FormControl} from "@angular/forms";
import {ResetForm} from "../../shared/interfaces/reset-form";
import {
  AddItemBasicFormValidationConfig,
  BasicFormValidation
} from "../../shared/validation/config/add-item-basic-form-validation-config";
import {Validation, ValidationResult} from "../../shared/validation/validation";
import {CategorySelection, CategoryType} from "../form-categories/form-categories.component";
import {ImageService} from "./image.service";

export type Basic = {
  itemName: FormControl<string>,
  category: FormControl<string>,
  subcategory: FormControl<string>,
  description: FormControl<string>,
  images: FormControl<File[]>,
}

@Injectable({
  providedIn: "root"
})
export class AddItemBasicFormService implements ResetForm {
  private itemImagesSignal: WritableSignal<Map<string, File>> = signal(new Map<string, File>());
  public itemImages: Signal<Map<string, File>> = computed(() => this.itemImagesSignal());

  private formBuilder: FormBuilder = inject(FormBuilder);
  private imageService: ImageService = inject(ImageService);

  private _form = this.formBuilder.nonNullable.group<Basic>({
    category: new FormControl<string>("", {nonNullable: true}),
    subcategory: new FormControl<string>("", {nonNullable: true}),
    description: new FormControl<string>("", {nonNullable: true}),
    itemName: new FormControl<string>("", {nonNullable: true}),
    images: new FormControl<File[]>([], {nonNullable: true}),
  });

  private validation = new Validation<string | string[]>(
    AddItemBasicFormValidationConfig.initialiseValidationConfig(this._form)
  );

  public get form() {
    return this._form;
  }

  public async addImage(event: Event): Promise<void> {
    let files: FileList | undefined | null;

    if (event instanceof DragEvent) {
      files = event.dataTransfer?.files;
    } else if (event.target instanceof HTMLInputElement) {
      files = event.target.files;
    }

    if (files) {
      const newImages: Map<string, File> = await this.imageService.addImage(files);

      newImages.forEach((value, key) => {
        this.itemImagesSignal().set(key, value);
      });

      this._form.patchValue({
        images: Array.from(this.itemImages().values())
      });
    }
  }

  public getValidationStatus(field: BasicFormValidation): ValidationResult {
    return this.validation.validationStatus(field);
  }

  public removeImage(image: string): void {
    const newImageMap: Map<string, File> = this.imageService.removeImage(this.itemImages(), image);
    this.itemImagesSignal.set(newImageMap);

    this._form.patchValue({
      images: Array.from(this.itemImages().values())
    });
  }

  public resetForm(): void {
    // If the image map doesn't get cleared, previous images will be set as default value on second form fill
    this.itemImages().clear();
    this._form.reset();
  }


  public updateCategory(category: CategorySelection): void {
    if (category.type === CategoryType.Category && this._form.controls.category.value !== category.value) {
      this._form.patchValue({
        category: category.value
      });
    } else if (category.type === CategoryType.Subcategory && this._form.controls.subcategory.value !== category.value) {
      this._form.patchValue({
        subcategory: category.value
      });
    }
  }

  public validateForm(): boolean {
    return this.validation.validateAllFields();
  }
}
