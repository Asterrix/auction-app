import {CommonModule} from "@angular/common";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {Observable} from "rxjs";
import {
  NavigationTrailService
} from "../../shared/components/navbar/components/navigation-trail/services/navigation-trail.service";
import {TabComponent} from "./components/tab/tab.component";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [CommonModule, TabComponent, RouterOutlet],
  templateUrl: "./profile-page.component.html",
  styleUrls: ["./profile-page.component.scss"]
})
export class ProfilePage implements OnInit, OnDestroy {
  displayTrail$: Observable<boolean> | undefined;

  constructor(private trailService: NavigationTrailService) {
  }

  public ngOnInit(): void {
    this.trailService.displayNavigationTrail();
    this.displayTrail$ = this.trailService.getDisplayTrail();
  }

  public ngOnDestroy(): void {
    this.trailService.closeNavigationTrail();
  }
}
