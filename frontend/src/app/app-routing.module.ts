import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeAboutUsComponent} from "./features/home/home-about-us/home-about-us.component";
import {HomePrivacyPolicyComponent} from "./features/home/home-privacy-policy/home-privacy-policy.component";
import {HomeTermsConditionsComponent} from "./features/home/home-terms-conditions/home-terms-conditions.component";

const applicationName: string = "Auction App";

const routes: Routes = [
  {
    path: "home",
    children: [
      {
        path: "about-us",
        title: `${applicationName} - About Us`,
        component: HomeAboutUsComponent
      },
      {
        path: "privacy-policy",
        title: `${applicationName} - Privacy Policy`,
        component: HomePrivacyPolicyComponent
      },
      {
        path: "terms-and-conditions",
        title: `${applicationName} - Terms And Conditions`,
        component: HomeTermsConditionsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
