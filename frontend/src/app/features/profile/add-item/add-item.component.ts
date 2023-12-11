import {CommonModule} from "@angular/common";
import {HttpResponse} from "@angular/common/http";
import {Component, HostListener, inject, OnDestroy} from "@angular/core";
import {Router} from "@angular/router";
import {tr} from "date-fns/locale";
import {LoaderComponent} from "../../../shared/components/loader/loader.component";
import {EventService} from "../../../shared/services/event.service";
import {LoaderService} from "../../../shared/services/loader.service";
import {HomeRouteEndpoint} from "../../home/home-routes";
import {ProfileRouteEndpoint} from "../profile-routes";
import {AddItemBasicFormComponent} from "./add-item-basic-form/add-item-basic-form.component";
import {AddItemLocationShippingComponent} from "./add-item-location-shipping/add-item-location-shipping.component";
import {AddItemSetPriceFormComponent} from "./add-item-set-price-form/add-item-set-price-form.component";
import {FormNavigation} from "./shared/form-navigation-handler";
import {ProgressBarComponent} from "./shared/progress-bar/progress-bar.component";
import {AddItemFormService} from "./shared/services/add-item-form.service";

@Component({
  selector: "profile-add-item",
  standalone: true,
  imports: [CommonModule, AddItemBasicFormComponent, AddItemSetPriceFormComponent, AddItemLocationShippingComponent, ProgressBarComponent, LoaderComponent],
  templateUrl: "./add-item.component.html",
  styleUrl: "./add-item.component.scss"
})
export class AddItemComponent implements FormNavigation, OnDestroy {
  protected currentFormNum = 1;
  protected totalFormNum = 3;
  protected displayCreditCardForm = false;
  private addItemFormService = inject(AddItemFormService);
  private eventService = inject(EventService);
  private router = inject(Router);
  private loaderService = inject(LoaderService);
  protected loader = false;

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
    if (this.currentFormNum === this.totalFormNum && this.displayCreditCardForm) {
      this.loaderService.getLoader("processing-form");
      this.loader = true;

      this.addItemFormService.submitForm().subscribe((httpResponse: HttpResponse<void>): void => {
        if (httpResponse.ok) {
          this.router
            .navigate([ProfileRouteEndpoint.MyAccount])
            .then(null);
        }
      }).add(()=> {
        this.loaderService.removeLoader("processing-form");
        this.loader = false;
      });
      return;
    }

    if (this.currentFormNum < this.totalFormNum) {
      this.currentFormNum++;
      return;
    }

    this.displayCreditCardForm = true;
  }

  public ngOnDestroy(): void {
    this.addItemFormService.resetForm();
  }

  @HostListener("window:beforeunload", ["$event"])
  unloadNotification($event: Event): void {
    this.eventService.preventDefaultBehaviour($event);
  }
}
