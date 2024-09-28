import {Component} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {NavigationTrailService, NavigationTrailStructure} from "./services/navigation-trail.service";
import {Observable} from "rxjs";

/* Navigation trail/ Path tracker / BreadCrumb component
*  Displays current navigation path that lead the client to their current page
*  Example: Home/Items/Item
*  Will display: Home -> Items -> Item
* */
@Component({
  selector: "app-breadcrumb",
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  templateUrl: "./navigation-trail.component.html",
  styleUrls: ["./navigation-trail.component.scss"]
})
export class NavigationTrailComponent {
  constructor(private navigationTrailService: NavigationTrailService) {
  }

  public getLabel(): Observable<String> {
    return this.navigationTrailService.getLastPathLabelAsObservable();
  }

  public getPaths(): Observable<Array<NavigationTrailStructure>> {
    return this.navigationTrailService.getPathsAsObservable();
  }
}
