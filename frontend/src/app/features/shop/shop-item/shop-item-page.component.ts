import {CommonModule} from "@angular/common";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {toObservable} from "@angular/core/rxjs-interop";
import {FormBuilder, FormGroup, FormsModule, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {PrimaryButtonComponent} from "../../../shared/components/buttons/primary-button/primary-button.component";
import {SecondaryButtonComponent} from "../../../shared/components/buttons/secondary-button/secondary-button.component";
import {InputFieldComponent} from "../../../shared/components/forms/input-field/input-field.component";
import {LoaderComponent} from "../../../shared/components/loader/loader.component";
import {
  NavigationTrailComponent
} from "../../../shared/components/navbar/components/navigation-trail/navigation-trail.component";
import {
  NavigationTrailService
} from "../../../shared/components/navbar/components/navigation-trail/services/navigation-trail.service";
import {Constant} from "../../../shared/models/enums/constant";
import {Alert, AlertService, AlertType} from "../../../shared/services/alert.service";
import {Api} from "../../../shared/services/api.service";
import {BidService} from "../../../shared/services/bid.service";
import {ItemService} from "../../../shared/services/item.service";
import {LoaderService} from "../../../shared/services/loader.service";
import {AuthenticationService, UserDetails} from "../../../shared/services/user/authentication.service";
import {ItemPageParameter} from "../shop-routes";
import {BidNotificationComponent} from "./components/bid-notification/bid-notification.component";
import {ItemDescriptionComponent} from "./components/item-description/item-description.component";
import {ItemShowcaseComponent} from "./components/item-showcase/item-showcase.component";
import {ItemSummaryComponent} from "./components/item-summary/item-summary.component";
import ItemAggregate = Api.ItemApi.Interfaces.ItemAggregate;
import ItemImage = Api.ItemApi.Interfaces.ItemImage;

@Component({
  selector: "shop-item",
  standalone: true,
  imports: [CommonModule, NavigationTrailComponent, ItemShowcaseComponent, ItemSummaryComponent, ItemDescriptionComponent, LoaderComponent, InputFieldComponent, PrimaryButtonComponent, SecondaryButtonComponent, FormsModule, BidNotificationComponent],
  templateUrl: "./shop-item-page.component.html",
  styleUrls: ["./shop-item-page.component.scss"]
})
export class ShopItemPage implements OnInit, OnDestroy {
  item$: Observable<ItemAggregate | undefined> | undefined;
  activeImage: ItemImage | undefined;
  itemImageSub: Subscription | undefined;
  bidForm: FormGroup = this.fb.group({
    offer: [Constant.EmptyValue, [Validators.required]]
  });
  alert: Observable<Alert> = toObservable(this.alertService.alert);

  constructor(private itemService: ItemService,
              private activeRoute: ActivatedRoute,
              private trailService: NavigationTrailService,
              public loader: LoaderService,
              private fb: FormBuilder,
              private biddingService: BidService,
              protected alertService: AlertService) {
  }

  ngOnInit(): void {
    const param = this.activeRoute.snapshot.params[ItemPageParameter.Id];
    this.itemService.initItem(param);
    this.trailService.displayNavigationTrail();
    this.item$ = this.itemService.getItem();
    this.determineActiveImage();

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
    this.itemImageSub?.unsubscribe();
    this.alertService.clearAlert();
  }

  determineActiveImage(): void {
    this.itemImageSub = this.item$?.subscribe((item: ItemAggregate | undefined): void => {
      if (item?.item.images && item?.item.images.length > 0) {
        this.activeImage = item?.item.images[0];
      }
    });
  }

  public onSubmit(): void {
    const user: UserDetails = <UserDetails>AuthenticationService.getCurrentUser();
    let itemId: number = this.activeRoute.snapshot.params["id"];
    this.biddingService.makeAnOffer({bidderId: user.id, itemId: itemId, amount: this.bidForm.get("offer")?.value});
  }
}
