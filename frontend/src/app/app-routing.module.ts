import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeAboutUsComponent} from "./features/home/home-about-us/home-about-us.component";
import {HomePrivacyPolicyComponent} from "./features/home/home-privacy-policy/home-privacy-policy.component";
import {HomeTermsConditionsComponent} from "./features/home/home-terms-conditions/home-terms-conditions.component";

const applicationName: string = "Auction App";

const routes: Routes = [
  {path: "", redirectTo: "/home", pathMatch: "full"},
  {
    path: "home",
    title: `${applicationName} - Home`,
    data: {
      trail: "Home"
    },
    children: [
      {
        path: "about-us",
        title: `${applicationName} - About Us`,
        component: HomeAboutUsComponent,
        data: {
          trail: "About Us"
        }
      },
      {
        path: "privacy-policy",
        title: `${applicationName} - Privacy Policy`,
        component: HomePrivacyPolicyComponent,
        data: {
          trail: "Privacy Policy"
        }
      },
      {
        path: "terms-and-conditions",
        title: `${applicationName} - Terms And Conditions`,
        component: HomeTermsConditionsComponent,
        data: {
          trail: "Terms And Conditions"
        }
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
