import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {NavbarComponent} from "./shared/components/navbar/navbar.component";
import {FooterComponent} from "./shared/components/footer/footer.component";
import {HomeAboutUsComponent} from "./features/home/home-about-us/home-about-us.component";
import {HomePrivacyPolicyComponent} from "./features/home/home-privacy-policy/home-privacy-policy.component";
import {HomeTermsConditionsComponent} from "./features/home/home-terms-conditions/home-terms-conditions.component";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NavbarComponent,
    FooterComponent,
    HomeAboutUsComponent,
    HomePrivacyPolicyComponent,
    HomeTermsConditionsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
