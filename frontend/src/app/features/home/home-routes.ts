import {Route} from "@angular/router";
import {environment} from "../../../environments/environment";
import {Constant} from "../../shared/models/enums/constant";
import {AboutUsPage} from "./home-about-us/about-us-page.component";
import {HomePage} from "./home-page.component";
import {PrivacyPolicyPage} from "./home-privacy-policy/privacy-policy-page.component";
import {TermsConditionsPage} from "./home-terms-conditions/terms-conditions-page.component";

export enum HomeRouteEndpoint {
  Home = "home",
  AboutUs = "about-us",
  PrivacyPolicy = "privacy-policy",
  TermsAndConditions = "terms-and-conditions"
}

export const HomeRouteTitles: Record<HomeRouteEndpoint, string> = {
  [HomeRouteEndpoint.Home]: "Home",
  [HomeRouteEndpoint.AboutUs]: "About Us",
  [HomeRouteEndpoint.PrivacyPolicy]: "Privacy Policy",
  [HomeRouteEndpoint.TermsAndConditions]: "Terms and Conditions"
};

export const HOME_ROUTES: Route[] = [
  {
    path: Constant.EmptyValue,
    title: `${environment.applicationName} - ${HomeRouteTitles[HomeRouteEndpoint.Home]}`,
    data: {
      trail: HomeRouteTitles[HomeRouteEndpoint.Home]
    },
    children: [
      {path: Constant.EmptyValue, component: HomePage},
      {
        path: HomeRouteEndpoint.AboutUs,
        title: `${environment.applicationName} - ${HomeRouteTitles[HomeRouteEndpoint.AboutUs]}`,
        component: AboutUsPage,
        data: {
          trail: `${HomeRouteTitles[HomeRouteEndpoint.AboutUs]}`
        }
      },
      {
        path: HomeRouteEndpoint.PrivacyPolicy,
        title: `${environment.applicationName} - ${HomeRouteTitles[HomeRouteEndpoint.PrivacyPolicy]}`,
        component: PrivacyPolicyPage,
        data: {
          trail: `${HomeRouteTitles[HomeRouteEndpoint.PrivacyPolicy]}`
        }
      },
      {
        path: HomeRouteEndpoint.TermsAndConditions,
        title: `${environment.applicationName} - ${HomeRouteTitles[HomeRouteEndpoint.TermsAndConditions]}`,
        component: TermsConditionsPage,
        data: {
          trail: `${HomeRouteTitles[HomeRouteEndpoint.TermsAndConditions]}`
        }
      },
    ]
  }
];
