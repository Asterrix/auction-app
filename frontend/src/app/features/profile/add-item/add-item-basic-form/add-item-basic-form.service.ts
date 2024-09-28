import {inject, Injectable} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, ɵElement} from "@angular/forms";
import {CategorySelection, CategoryType} from "./form-categories/form-categories.component";
import {ImageService} from "./services/image.service";
import {
  AddItemBasicFormValidationConfig,
  BasicFormValidation
} from "../shared/validation/config/add-item-basic-form-validation-config";
import {Validation, ValidationResult} from "../shared/validation/validation";

export type Basic = {
  itemName: FormControl<string>,
  category: FormControl<string>,
  subcategory: FormControl<string>,
  description: FormControl<string>,
  photos: FormControl<string[]>,
}

interface AddItemBasicForm {
  validateForm(): boolean;

  getValidationStatus(field: BasicFormValidation): ValidationResult;

  addImage(event: Event): Promise<void>;

  removeImage(image: string): void;

  updateCategory(category: CategorySelection): void;
}

@Injectable({
  providedIn: "root"
})
export class AddItemBasicFormService implements AddItemBasicForm {
  protected itemImages: string[] = [];
  private formBuilder: FormBuilder = inject(FormBuilder);
  private imageService: ImageService = inject(ImageService);

  private _form = this.formBuilder.nonNullable.group<Basic>({
    category: new FormControl<string>("", {nonNullable: true}),
    description: new FormControl<string>("", {nonNullable: true}),
    itemName: new FormControl<string>("", {nonNullable: true}),
    photos: new FormControl<string[]>(this.itemImages, {nonNullable: true}),
    subcategory: new FormControl<string>("", {nonNullable: true}),
  });

  private validation = new Validation<string | string[]>(AddItemBasicFormValidationConfig.initialiseValidationConfig(this._form));

  public get form(): FormGroup<{ [K in keyof Basic]: ɵElement<Basic[K], never> }> {
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
      const newImages: string[] = await this.imageService.addImage(files);
      this.itemImages = this.imageService.filterDuplicates(this.itemImages, newImages);

      this._form.patchValue({
        photos: this.itemImages
      });
    }
  }

  public getValidationStatus(field: BasicFormValidation): ValidationResult {
    return this.validation.validationStatus(field);
  }

  public removeImage(image: string): void {
    this.itemImages = this.imageService.removeImage(this.itemImages, image);

    this._form.patchValue({
      photos: this.itemImages
    });
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
