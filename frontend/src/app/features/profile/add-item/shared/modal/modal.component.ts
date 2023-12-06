import {CommonModule} from "@angular/common";
import {Component, EventEmitter, inject, Output} from "@angular/core";
import {EventService} from "../../../../../shared/services/event.service";

@Component({
  selector: "app-modal",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./modal.component.html",
  styleUrl: "./modal.component.scss"
})
export class ModalComponent {
  @Output() closeModalEvent = new EventEmitter<void>();
  protected eventService: EventService = inject(EventService);

  public closeModal(): void {
    this.closeModalEvent.emit();
  }
}
