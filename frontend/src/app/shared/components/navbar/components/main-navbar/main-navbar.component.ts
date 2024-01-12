import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component} from "@angular/core";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {Observable} from "rxjs";
import {ProfileRouteEndpoint} from "../../../../../features/profile/profile-routes";
import {SearchSuggestionService} from "../../../../services/suggestion/search-suggestion.service";
import {AuthenticationService} from "../../../../services/user/authentication.service";
import {AnchorImageComponent} from "../../../anchor-image/anchor-image.component";
import {SearchBarComponent} from "../search-bar/search-bar.component";

@Component({
  selector: "navbar-main",
  standalone: true,
  imports: [CommonModule, SearchBarComponent, NgOptimizedImage, RouterLink, AnchorImageComponent, RouterLinkActive],
  templateUrl: "main-navbar.component.html",
  styleUrls: ["./main-navbar.component.scss"]
})
export class MainNavbarComponent {
  protected readonly ProfileRouteEndpoint = ProfileRouteEndpoint;
  protected readonly searchSuggestion$: Observable<string | undefined>;

  constructor(
    protected userService: AuthenticationService,
    private readonly searchSuggestionService: SearchSuggestionService,
    private readonly router: Router
  ) {
    this.searchSuggestion$ = this.searchSuggestionService.searchSuggestion$;
  }

  protected querySuggestion = async (suggestion: string) => {
    await this.router.navigate([], {
      relativeTo: this.router.routerState.root,
      queryParams: {itemName: suggestion},
    });
  };
}
