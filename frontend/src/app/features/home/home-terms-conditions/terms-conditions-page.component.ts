import {CommonModule} from "@angular/common";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {NavigationTrailComponent} from "../../../shared/components/navbar/components/navigation-trail/navigation-trail.component";
import {NavigationTrailService} from "../../../shared/components/navbar/components/navigation-trail/services/navigation-trail.service";
import {ArticleCardComponent} from "../components/article-card/article-card.component";

@Component({
  selector: "home-terms-conditions",
  standalone: true,
  imports: [CommonModule, ArticleCardComponent, NavigationTrailComponent],
  templateUrl: "terms-conditions-page.component.html",
  styleUrls: ["./terms-conditions-page.component.scss"]
})
export class TermsConditionsPage implements OnInit, OnDestroy {
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
