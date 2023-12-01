import {Injectable} from "@angular/core";

interface EventServiceInterface {
  preventDefaultBehaviour($event: Event): void;
}

@Injectable({
  providedIn: "root"
})
export class EventService implements EventServiceInterface {
  public preventDefaultBehaviour($event: Event): void {
    $event.preventDefault();
    $event.stopPropagation();
  }
}
