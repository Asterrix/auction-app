import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {toObservable} from "@angular/core/rxjs-interop";
import {FormBuilder, FormGroup, FormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {PrimaryButtonComponent} from "../../../shared/components/buttons/primary-button/primary-button.component";
import {SecondaryButtonComponent} from "../../../shared/components/buttons/secondary-button/secondary-button.component";
import {InputFieldComponent} from "../../../shared/components/forms/input-field/input-field.component";
import {
  ValidationMessageComponent
} from "../../../shared/components/forms/validation-message/validation-message.component";
import {LoaderComponent} from "../../../shared/components/loader/loader.component";
import {
  NavigationTrailComponent
} from "../../../shared/components/navbar/components/navigation-trail/navigation-trail.component";
import {
  NavigationTrailService
} from "../../../shared/components/navbar/components/navigation-trail/services/navigation-trail.service";
import {Alert, AlertService, AlertType} from "../../../shared/services/alert.service";
import {BidService} from "../../../shared/services/bid.service";
import {ErrorService} from "../../../shared/services/error.service";
import {ItemService} from "../../../shared/services/item.service";
import {LoaderService} from "../../../shared/services/loader.service";
import {AuthenticationService} from "../../../shared/services/user/authentication.service";
import {ItemPageParameter} from "../shop-routes";
import {BidNotificationComponent} from "./components/bid-notification/bid-notification.component";
import {ItemDescriptionComponent} from "./components/item-description/item-description.component";
import {ItemShowcaseComponent} from "./components/item-showcase/item-showcase.component";
import {ItemSummaryComponent} from "./components/item-summary/item-summary.component";

@Component({
  selector: "shop-item",
  standalone: true,
  imports: [
    CommonModule,
    NavigationTrailComponent,
    ItemShowcaseComponent,
    ItemSummaryComponent,
    ItemDescriptionComponent,
    LoaderComponent,
    InputFieldComponent,
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    FormsModule,
    BidNotificationComponent,
    ValidationMessageComponent,
    NgOptimizedImage
  ],
  templateUrl: "./shop-item-page.component.html",
  styleUrls: ["./shop-item-page.component.scss"]
})
export class ShopItemPage implements OnInit, OnDestroy {
  bidForm: FormGroup = this.fb.group({
    offer: ["", [Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
  });
  alert: Observable<Alert> = toObservable(this.alertService.alert);

  constructor(protected itemService: ItemService,
              private activeRoute: ActivatedRoute,
              private trailService: NavigationTrailService,
              public loader: LoaderService,
              private fb: FormBuilder,
              private biddingService: BidService,
              protected alertService: AlertService,
              private errorService: ErrorService,
              private router: Router) {
  }

  ngOnInit(): void {
    const param = this.activeRoute.snapshot.params[ItemPageParameter.Id];
    this.itemService.initItem(param);
    this.trailService.displayNavigationTrail();

    this.alert.subscribe(value => {
      if (value.type !== AlertType.None) {
        setTimeout(() => {
          this.alertService.clearAlert();
        }, 5000);
      }
    });
  }

  ngOnDestroy(): void {
    this.trailService.closeNavigationTrail();
    this.alertService.clearAlert();
  }

  public onSubmit(): void {
    if (!AuthenticationService.isAuthenticated()) {
      this.errorService.setError({
        message: "You must be authenticated to make offers on items.",
        type: AlertType.WarningLevelTwo
      });
      this.router.navigate(["/login"]).then(null);
    }

    if (this.bidForm.valid) {
      const itemId: number = this.activeRoute.snapshot.params["id"];
      this.biddingService.makeAnOffer({
        itemId: itemId,
        amount: this.bidForm.get("offer")?.value
      });
    }
  }
}
