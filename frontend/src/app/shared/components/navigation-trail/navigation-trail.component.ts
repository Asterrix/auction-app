import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Component} from "@angular/core";
import {RouterLink} from "@angular/router";
import {Observable} from "rxjs";
import {NavigationTrailService, NavigationTrailStructure} from "./services/navigation-trail.service";

export enum NavigationTrail {
  Trail = "trail"
}

/* Navigation trail/ Path tracker / BreadCrumb component
*  Displays current navigation path that lead the client to their current page
*  Example: Home/Items/Item
*  Will display: Home -> Items -> Item
* */
@Component({
  selector: "app-navigation-trail",
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  templateUrl: "./navigation-trail.component.html",
  styleUrls: ["./navigation-trail.component.scss"]
})
export class NavigationTrailComponent {
  constructor(private navigationTrailService: NavigationTrailService) {
  }

  public getLabel(): Observable<string> {
    return this.navigationTrailService.getLastPathLabelAsObservable();
  }

  public getPaths(): Observable<Array<NavigationTrailStructure>> {
    return this.navigationTrailService.getPathsAsObservable();
  }
}
