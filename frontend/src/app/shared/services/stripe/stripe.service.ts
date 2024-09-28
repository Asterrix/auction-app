import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment.development";

enum Endpoint {
  Stripe = "stripe",
  Config = "config",
  CreatePaymentIntent = "create-payment-intent",
  ConfirmPurchase = "confirm-purchase"
}

export type ClientSecret = {
  clientSecret: string;
}

@Injectable({
  providedIn: "root"
})
export class StripeService {
  private httpClient: HttpClient = inject(HttpClient);

  public initialiseStripe(): Observable<string> {
    return this.httpClient.get<string>(`${environment.apiUrl}/${Endpoint.Stripe}/${Endpoint.Config}`);
  }

  public createPaymentIntent(itemId: number): Observable<ClientSecret> {
    const params: HttpParams = new HttpParams().set("itemId", itemId);

    return this.httpClient.post<ClientSecret>(`${environment.apiUrl}/${Endpoint.Stripe}/${Endpoint.CreatePaymentIntent}`, {}, {params: params});
  }

  public confirmPurchase(itemId: number): Observable<HttpResponse<void>> {
    const params: HttpParams = new HttpParams().set("itemId", itemId);

    return this.httpClient.post<void>(`${environment.apiUrl}/${Endpoint.Stripe}/${Endpoint.ConfirmPurchase}`, {}, {
      params: params,
      observe: "response"
    });
  }
}
