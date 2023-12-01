import {Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Constant} from "../../../../../../shared/models/enums/constant";
import {EventService} from "../../../../../../shared/services/event.service";

@Component({
  selector: "add-item-basic-form-images",
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: "./form-images.component.html",
  styleUrl: "./form-images.component.scss"
})
export class FormImagesComponent {
  @Input({required: true}) itemImages!: string[];
  @Output() addImageEvent = new EventEmitter<Event>();
  @Output() removeImageEvent = new EventEmitter<string>();
  @ViewChild("fileInput") fileInput!: ElementRef;
  protected highlighted = false;
  protected eventService = inject(EventService);

  protected async removeImage($event: MouseEvent, image: string): Promise<void> {
    this.resetFileInputValues();
    this.eventService.preventDefaultBehaviour($event);
    this.removeImageEvent.emit(image);
  }

  protected async addImage($event: Event): Promise<void> {
    this.eventService.preventDefaultBehaviour($event);
    this.addImageEvent.emit($event);
  }

  protected highlightInputField($event: Event, value: boolean): void {
    this.eventService.preventDefaultBehaviour($event);
    this.highlighted = value;
  }

  private resetFileInputValues(): void {
    this.fileInput.nativeElement.value = Constant.EmptyValue;
  }
}
