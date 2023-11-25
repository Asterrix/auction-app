import {CommonModule} from "@angular/common";
import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {MainNavbarComponent} from "./components/main-navbar/main-navbar.component";
import {MainNavbarHandler} from "./components/main-navbar/services/main-navbar-handler.service";
import {MinimalistMainNavbarComponent} from "./components/minimalist-main-navbar/minimalist-main-navbar.component";
import {NavigationTrailComponent} from "./components/navigation-trail/navigation-trail.component";
import {NavigationTrailService} from "./components/navigation-trail/services/navigation-trail.service";
import {TopBarComponent} from "./components/top-bar/top-bar.component";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule, TopBarComponent, MainNavbarComponent, NavigationTrailComponent, MinimalistMainNavbarComponent],
  templateUrl: "navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  displayTrail$: Observable<boolean> | undefined;

  constructor(private trailService: NavigationTrailService, protected mainNavbarHandler: MainNavbarHandler) {
  }

  ngOnInit(): void {
    this.displayTrail$ = this.trailService.getDisplayTrail();
  }
}
