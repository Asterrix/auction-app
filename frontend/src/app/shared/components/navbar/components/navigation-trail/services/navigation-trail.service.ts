import {Injectable} from "@angular/core";
import {ActivatedRoute, Router, UrlSegment} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {distinctUntilChanged, map} from "rxjs/operators";
import {Constant} from "../../../../../models/enums/constant";
import {NavigationTrail} from "../navigation-trail.component";

export interface NavigationTrailStructure {
  label: string;
  path: string | null;
}

@Injectable({
  providedIn: "root"
})
export class NavigationTrailService {
  private readonly paths$: Observable<Array<NavigationTrailStructure>>;
  private readonly lastPathLabel$: Observable<string>;
  private display = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private route: ActivatedRoute) {
    this.paths$ = this.router.events.pipe(
      distinctUntilChanged(),
      map(_ => this.buildNavigationTrail(this.route.root))
    );

    this.lastPathLabel$ = this.paths$.pipe(
      map((items: Array<NavigationTrailStructure>): string => {
        return items.length > 0 ? items[items.length - 1].label : Constant.EmptyValue;
      })
    );
  }

  public getDisplayTrail(): Observable<boolean> {
    return this.display.asObservable();
  }

  public displayNavigationTrail(): void {
    this.display.next(true);
  }

  public closeNavigationTrail(): void {
    this.display.next(false);
  }

  public getPathsAsObservable(): Observable<Array<NavigationTrailStructure>> {
    return this.paths$;
  }

  public getLastPathLabelAsObservable(): Observable<string> {
    return this.lastPathLabel$;
  }

  /**
   * Builds a navigation trail based on the provided route by traversing the Angular route tree.
   *
   * This method searches for a "trail" property in Route configuration data to generate labels.
   *
   * @example
   * In the Route configuration, you have to define a "trail" property to specify the label for each route:
   * {
   *   path: `/home`,
   *   data: {
   *     trail: `Home`
   *   }
   * }
   *
   * Method will generate a data structure of `[label, path]` where the label is the `trail` property of the route
   * and the path is the path of the given route.
   *
   * @param route - The root `ActivatedRoute` from which to start building the trail.
   * @returns An array of `[label, path]` representing the navigation trail.
   */
  private buildNavigationTrail(route: ActivatedRoute): Array<NavigationTrailStructure> {
    const navigationTrails: Array<NavigationTrailStructure> = new Array<NavigationTrailStructure>();
    let currentRoute: ActivatedRoute = route;
    let trailPath: string = Constant.EmptyValue;

    while (currentRoute) {
      const nextTrailPath: string = this.generateNextTrail(trailPath, currentRoute);

      const trailData = currentRoute.routeConfig?.data?.[NavigationTrail.Trail];

      if (trailData) {
        const label: string = trailData, path: string = nextTrailPath;
        navigationTrails.push({label: label, path: path});
      }

      if (currentRoute.firstChild) {
        currentRoute = currentRoute.firstChild;
        trailPath = nextTrailPath;
      } else {
        break;
      }
    }

    return navigationTrails;
  }

  /**
   * Generates the next trail path by combining the current trail path and the route's URL segments.
   *
   * @example
   *
   * // Initial Trail Path
   * const trailPath = "/";
   *
   * // Current route snapshot url
   * const currentRouteSnapshotUrl = "home";
   *
   * // Result
   * Path of "/home"
   *
   * @param trailPath - The current trail path.
   * @param currentRoute - The current `ActivatedRoute` for which to generate the trail path.
   * @returns The next trail path.
   */
  private generateNextTrail(trailPath: string, currentRoute: ActivatedRoute): string {
    return `${trailPath}/${currentRoute.snapshot.url
      .map((segment: UrlSegment) => segment.path)
      .join("/")}`
      .replace("//", "/");
  }
}
