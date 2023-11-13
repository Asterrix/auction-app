import {CommonModule} from "@angular/common";
import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {ItemService} from "../../services/item.service";
import {SearchService} from "../../services/search.service";
import {MainNavbarComponent} from "./components/main-navbar/main-navbar.component";
import {NavigationTrailComponent} from "./components/navigation-trail/navigation-trail.component";
import {NavigationTrailService} from "./components/navigation-trail/services/navigation-trail.service";
import {SearchSuggestionComponent} from "./components/search-suggestion/search-suggestion.component";
import {TopBarComponent} from "./components/top-bar/top-bar.component";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule, TopBarComponent, MainNavbarComponent, NavigationTrailComponent, SearchSuggestionComponent],
  templateUrl: "navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  displayTrail$: Observable<boolean> | undefined;
  displaySearchSuggestion$: Observable<boolean> | undefined;

  constructor(private trailService: NavigationTrailService,
              private searchService: SearchService,
              public itemService: ItemService) {
  }

  ngOnInit(): void {
    this.displayTrail$ = this.trailService.getDisplayTrail();
    this.displaySearchSuggestion$ = this.searchService.getDisplay();
  }
}
