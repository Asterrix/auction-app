import {CommonModule} from "@angular/common";
import {Component, inject} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {InputFieldComponent} from "../../../../shared/components/forms/input-field/input-field.component";
import {FormMemberComponent} from "../shared/form-member/form-member.component";
import {FormCategoriesComponent} from "./form-categories/form-categories.component";
import {FormImagesComponent} from "./form-images/form-images.component";
import {FormTextAreaComponent} from "./form-text-area/form-text-area.component";
import {FormWrapperComponent} from "../../../../shared/components/forms/form-wrapper/form-wrapper.component";
import {ImageService} from "./services/image.service";

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
    FormMemberComponent
  ],
  templateUrl: "./add-item-basic-form.component.html",
  styleUrls: ["./add-item-basic-form.component.scss"]
})
export class AddItemBasicFormComponent {
  protected itemImages: string[] = [];
  private imageService: ImageService = inject(ImageService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  protected form: FormGroup = this.formBuilder.nonNullable.group({});

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
    }
  }

  protected removeImage(image: string): void {
    this.itemImages = this.imageService.removeImage(this.itemImages, image);
  }
}
