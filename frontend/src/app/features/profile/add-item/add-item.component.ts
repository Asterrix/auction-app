import {CommonModule} from "@angular/common";
import {HttpResponse} from "@angular/common/http";
import {Component, HostListener, inject, OnDestroy} from "@angular/core";
import {Router} from "@angular/router";
import {catchError} from "rxjs";
import {LoaderComponent} from "../../../shared/components/loader/loader.component";
import {AlertType} from "../../../shared/services/alert.service";
import {ErrorService} from "../../../shared/services/error.service";
import {EventService} from "../../../shared/services/event.service";
import {HomeRouteEndpoint} from "../../home/home-routes";
import {BidNotificationComponent} from "../../shop/shop-item/components/bid-notification/bid-notification.component";
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
  imports: [
    CommonModule,
    AddItemBasicFormComponent,
    AddItemSetPriceFormComponent,
    AddItemLocationShippingComponent,
    ProgressBarComponent,
    LoaderComponent,
    BidNotificationComponent
  ],
  templateUrl: "./add-item.component.html",
  styleUrl: "./add-item.component.scss"
})
export class AddItemComponent implements FormNavigation, OnDestroy {
  protected currentFormNum = 1;
  protected totalFormNum = 3;
  protected displayCreditCardForm = false;
  protected loader = false;
  protected errorService = inject(ErrorService);
  protected readonly AlertType = AlertType;
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
    if (this.currentFormNum === this.totalFormNum && this.displayCreditCardForm) {
      this.loader = true;

      this.addItemFormService.submitForm()
        .pipe(
          catchError(err => {
            this.errorService.setError({
              type: AlertType.WarningLevelOne,
              message: "Error occurred while processing your request. Try again later."
            });
            setTimeout(() => {
              this.errorService.clearError();
            }, 5000);
            throw new err;
          })
        )
        .subscribe((httpResponse: HttpResponse<void>): void => {
          if (httpResponse.ok) {
            this.router
              .navigate([ProfileRouteEndpoint.MyAccount])
              .then(null);
          }
        })
        .add(() => this.loader = false);
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
