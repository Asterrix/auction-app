import {Route} from "@angular/router";
import {HomeComponent} from "./home.component";
import {environment} from "../../../environments/environment";
import {Constant} from "../../shared/models/enums/constant";
import {HomeAboutUsComponent} from "./home-about-us/home-about-us.component";
import {HomePrivacyPolicyComponent} from "./home-privacy-policy/home-privacy-policy.component";
import {HomeTermsConditionsComponent} from "./home-terms-conditions/home-terms-conditions.component";

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
      {path: Constant.EmptyValue, component: HomeComponent},
      {
        path: HomeRouteEndpoint.AboutUs,
        title: `${environment.applicationName} - ${HomeRouteTitles[HomeRouteEndpoint.AboutUs]}`,
        component: HomeAboutUsComponent,
        data: {
          trail: `${HomeRouteTitles[HomeRouteEndpoint.AboutUs]}`
        }
      },
      {
        path: HomeRouteEndpoint.PrivacyPolicy,
        title: `${environment.applicationName} - ${HomeRouteTitles[HomeRouteEndpoint.PrivacyPolicy]}`,
        component: HomePrivacyPolicyComponent,
        data: {
          trail: `${HomeRouteTitles[HomeRouteEndpoint.PrivacyPolicy]}`
        }
      },
      {
        path: HomeRouteEndpoint.TermsAndConditions,
        title: `${environment.applicationName} - ${HomeRouteTitles[HomeRouteEndpoint.TermsAndConditions]}`,
        component: HomeTermsConditionsComponent,
        data: {
          trail: `${HomeRouteTitles[HomeRouteEndpoint.TermsAndConditions]}`
        }
      },
    ]
  }
];
