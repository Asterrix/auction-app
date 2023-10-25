import {Route} from "@angular/router";
import {ApiRoute, HomeRouteTitles} from "../../../environments/api-route";
import {HomeComponent} from "./home.component";
import {environment} from "../../../environments/environment";
import {Constant} from "../../shared/models/enums/constant";
import {HomeAboutUsComponent} from "./home-about-us/home-about-us.component";
import {HomePrivacyPolicyComponent} from "./home-privacy-policy/home-privacy-policy.component";
import {HomeTermsConditionsComponent} from "./home-terms-conditions/home-terms-conditions.component";

export const HOME_ROUTES: Route[] = [
  {
    path: Constant.EmptyValue,
    title: `${environment.applicationName} - ${HomeRouteTitles[ApiRoute.HomeRoute.Home]}`,
    data: {
      trail: HomeRouteTitles[ApiRoute.HomeRoute.Home]
    },
    children: [
      {path: Constant.EmptyValue, component: HomeComponent},
      {
        path: ApiRoute.HomeRoute.AboutUs,
        title: `${environment.applicationName} - ${HomeRouteTitles[ApiRoute.HomeRoute.AboutUs]}`,
        component: HomeAboutUsComponent,
        data: {
          trail: `${HomeRouteTitles[ApiRoute.HomeRoute.AboutUs]}`
        }
      },
      {
        path: ApiRoute.HomeRoute.PrivacyPolicy,
        title: `${environment.applicationName} - ${HomeRouteTitles[ApiRoute.HomeRoute.PrivacyPolicy]}`,
        component: HomePrivacyPolicyComponent,
        data: {
          trail: `${HomeRouteTitles[ApiRoute.HomeRoute.PrivacyPolicy]}`
        }
      },
      {
        path: ApiRoute.HomeRoute.TermsAndConditions,
        title: `${environment.applicationName} - ${HomeRouteTitles[ApiRoute.HomeRoute.TermsAndConditions]}`,
        component: HomeTermsConditionsComponent,
        data: {
          trail: `${HomeRouteTitles[ApiRoute.HomeRoute.TermsAndConditions]}`
        }
      },
    ]
  }
];
