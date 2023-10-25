/* Endpoints */
enum HomeRouteEndpoint {
  Home = "home",
  AboutUs = "about-us",
  PrivacyPolicy = "privacy-policy",
  TermsAndConditions = "terms-and-conditions"
}

enum ItemRouteEndpoint {
  Items = "items",
  Featured = "featured"
}

/* Page Labels */
export const HomeRouteTitles: Record<HomeRouteEndpoint, string> = {
  [HomeRouteEndpoint.Home]: "Home",
  [HomeRouteEndpoint.AboutUs]: "About Us",
  [HomeRouteEndpoint.PrivacyPolicy]: "Privacy Policy",
  [HomeRouteEndpoint.TermsAndConditions]: "Terms and Conditions"
};


/* Groups All Endpoints Together */
export const ApiRoute = {
  HomeRoute: HomeRouteEndpoint,
  ItemRoute: ItemRouteEndpoint
};
