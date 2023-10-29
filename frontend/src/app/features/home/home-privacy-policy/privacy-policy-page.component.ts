import {CommonModule} from "@angular/common";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {
  NavigationTrailComponent
} from "../../../shared/components/navbar/components/navigation-trail/navigation-trail.component";
import {
  NavigationTrailService
} from "../../../shared/components/navbar/components/navigation-trail/services/navigation-trail.service";
import {ContentCardComponent} from "../components/content-card/content-card.component";

@Component({
  selector: "home-privacy-policy",
  standalone: true,
  imports: [CommonModule, NavigationTrailComponent, ContentCardComponent],
  templateUrl: "privacy-policy-page.component.html",
  styleUrls: ["./privacy-policy-page.component.scss"]
})
export class PrivacyPolicyPage implements OnInit, OnDestroy {
  displayTrail$: Observable<boolean> | undefined;

  constructor(private trailService: NavigationTrailService) {
  }

  ngOnInit(): void {
    this.trailService.displayNavigationTrail();
    this.displayTrail$ = this.trailService.getDisplayTrail();
  }

  ngOnDestroy(): void {
    this.trailService.closeNavigationTrail();
  }
}
