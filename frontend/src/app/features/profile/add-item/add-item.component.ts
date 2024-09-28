import {CommonModule} from "@angular/common";
import {Component, inject} from "@angular/core";
import {Router} from "@angular/router";
import {HomeRouteEndpoint} from "../../home/home-routes";
import {AddItemBasicFormComponent} from "./add-item-basic-form/add-item-basic-form.component";
import {AddItemLocationShippingComponent} from "./add-item-location-shipping/add-item-location-shipping.component";
import {AddItemSetPriceFormComponent} from "./add-item-set-price-form/add-item-set-price-form.component";
import {FormNavigation} from "./shared/form-navigation-handler";
import {AddItemFormService} from "./shared/services/add-item-form.service";

@Component({
  selector: "profile-add-item",
  standalone: true,
  imports: [CommonModule, AddItemBasicFormComponent, AddItemSetPriceFormComponent, AddItemLocationShippingComponent],
  templateUrl: "./add-item.component.html",
  styleUrl: "./add-item.component.scss"
})
export class AddItemComponent implements FormNavigation {
  protected currentForm = 1;
  protected displayCreditCardForm = false;
  private addItemFormService = inject(AddItemFormService);
  private router = inject(Router);

  public cancelFormEvent(): void {
    this.addItemFormService.resetForm();
    this.router.navigate([HomeRouteEndpoint.Home]).then(null);
  }

  public goBackEvent(): void {
    if (this.displayCreditCardForm) {
      this.displayCreditCardForm = false;
    } else {
      this.currentForm--;
    }
  }

  public submitFormEvent(): void {
    if (this.currentForm === 3) {
      this.displayCreditCardForm = true;
    } else {
      this.currentForm++;
    }
  }
}
