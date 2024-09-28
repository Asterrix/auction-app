import {CommonModule} from "@angular/common";
import {Component, ElementRef, inject, OnDestroy, ViewChild} from "@angular/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {loadStripe, Stripe, StripeElements, StripeError} from "@stripe/stripe-js";
import {catchError, Subscription} from "rxjs";
import {CornerMessageComponent} from "../../../shared/components/corner-message/corner-message.component";
import {CornerMessageService} from "../../../shared/components/corner-message/corner-message.service";
import {FormAlertComponent} from "../../../shared/components/forms/form-alert/form-alert.component";
import {FormWrapperComponent} from "../../../shared/components/forms/form-wrapper/form-wrapper.component";
import {LoaderComponent} from "../../../shared/components/loader/loader.component";
import {ModalComponent} from "../../../shared/components/modal/modal.component";
import {Constant} from "../../../shared/models/enums/constant";
import {AlertType} from "../../../shared/services/alert.service";
import {ErrorService} from "../../../shared/services/error.service";
import {ClientSecret, StripeService} from "../../../shared/services/stripe/stripe.service";
import {ProfileRouteEndpoint} from "../../profile/profile-routes";

@Component({
  selector: "app-purchase-item",
  standalone: true,
  imports: [CommonModule, FormWrapperComponent, FormsModule, LoaderComponent, ModalComponent, CornerMessageComponent, FormAlertComponent],
  templateUrl: "./purchase-item.component.html",
  styleUrl: "./purchase-item.component.scss",
  providers: [ErrorService]
})
export class PurchaseItemComponent implements OnDestroy {
  @ViewChild("paymentElement") paymentElement!: ElementRef;
  protected loader = true;
  protected readonly AlertType = AlertType;
  protected errorService = inject(ErrorService);
  private activeRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private clientSecret: string = "";
  private elements: StripeElements | undefined;
  private readonly itemId = this.activeRoute.snapshot.params["id"];
  private stripe: Stripe | null | undefined;
  private stripeService = inject(StripeService);
  private messageDisplayService: CornerMessageService = inject(CornerMessageService);
  private confirmPurchaseSub: Subscription | undefined;


  constructor() {
    this.stripeService.initialiseStripe()
      .pipe(takeUntilDestroyed())
      .subscribe(async key => {
        this.stripe = await loadStripe(key);

        this.stripeService.createPaymentIntent(this.itemId).subscribe((secret: ClientSecret) => {
          this.clientSecret = secret.clientSecret;

          this.elements = this.stripe!.elements({
            clientSecret: this.clientSecret,
            appearance: {
              variables: {
                borderRadius: "0",
                colorPrimary: "#8367D8",
              }
            }
          });

          const paymentElement = this.elements.create("payment");
          paymentElement.mount(this.paymentElement.nativeElement);

          setTimeout(() => {
            this.loader = false;
          }, 1000);
        });
      });
  }

  public ngOnDestroy(): void {
    this.confirmPurchaseSub?.unsubscribe();
  }

  async submitForm() {
    const elements: StripeElements = this.elements!;

    const {error: submitError} = await elements.submit();
    if (submitError) {
      this.handleError(submitError);
      return;
    }

    const response = await this.stripe?.confirmPayment({
      elements: elements,
      clientSecret: this.clientSecret,
      redirect: "if_required",
      confirmParams: {
        return_url: Constant.EmptyValue,
      }
    });

    if (response?.error) {
      this.handleError(response.error);
      return;
    }

    this.confirmPurchase();
  }

  private confirmPurchase(): void {
    this.confirmPurchaseSub = this.stripeService.confirmPurchase(this.itemId)
      .pipe(catchError(err => {
        const error: StripeError = err;
        this.handleError(error);
        throw new err;
      }))
      .subscribe(async () => {
        this.messageDisplayService.setDisplayMessage({
          display: true,
          title: "Congratulations!",
          message: "Your purchase has been completed successfully!",
        });
        await this.router.navigate(["/", ProfileRouteEndpoint.MyAccount]);
      });
  }

  private handleError(error: any): void {
    this.errorService.setError({type: AlertType.WarningLevelOne, message: error.message});
  };
}
