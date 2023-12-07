import {CommonModule} from "@angular/common";
import {Component, HostListener, inject, OnDestroy} from "@angular/core";
import {Router} from "@angular/router";
import {EventService} from "../../../shared/services/event.service";
import {HomeRouteEndpoint} from "../../home/home-routes";
import {AddItemBasicFormComponent} from "./add-item-basic-form/add-item-basic-form.component";
import {AddItemLocationShippingComponent} from "./add-item-location-shipping/add-item-location-shipping.component";
import {AddItemSetPriceFormComponent} from "./add-item-set-price-form/add-item-set-price-form.component";
import {FormNavigation} from "./shared/form-navigation-handler";
import {ProgressBarComponent} from "./shared/progress-bar/progress-bar.component";
import {AddItemFormService} from "./shared/services/add-item-form.service";

@Component({
  selector: "profile-add-item",
  standalone: true,
  imports: [CommonModule, AddItemBasicFormComponent, AddItemSetPriceFormComponent, AddItemLocationShippingComponent, ProgressBarComponent],
  templateUrl: "./add-item.component.html",
  styleUrl: "./add-item.component.scss"
})
export class AddItemComponent implements FormNavigation, OnDestroy {
  protected currentFormNum = 2;
  protected totalFormNum = 3;
  protected displayCreditCardForm = false;
  private addItemFormService = inject(AddItemFormService);
  private eventService = inject(EventService);
  private router = inject(Router);

  public cancelFormEvent(): void {
    this.addItemFormService.resetForm();
    this.router.navigate([HomeRouteEndpoint.Home]).then(null);
  }

  public goBackEvent(): void {
    if (this.displayCreditCardForm) {
      this.displayCreditCardForm = false;
    } else if (this.currentFormNum > 1) {
      this.currentFormNum--;
    }
  }

  public submitFormEvent(): void {
    if (this.currentFormNum === this.totalFormNum) {
      this.displayCreditCardForm = true;
    } else if (this.currentFormNum < this.totalFormNum) {
      this.currentFormNum++;
    }
  }

  public ngOnDestroy(): void {
    this.addItemFormService.resetForm();
  }

  // @HostListener("window:beforeunload", ["$event"])
  // unloadNotification($event: Event): void {
  //   this.eventService.preventDefaultBehaviour($event);
  // }
}
