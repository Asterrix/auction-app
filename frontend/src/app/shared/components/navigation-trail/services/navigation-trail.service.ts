import {Injectable} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {distinctUntilChanged, map} from "rxjs/operators";
import {Constant} from "../../../models/enums/constant";
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

  constructor(private router: Router, private route: ActivatedRoute) {
    this.paths$ = this.router.events.pipe(
      distinctUntilChanged(),
      map(_ => this.buildNavigationTrail(this.route.root))
    );

    this.lastPathLabel$ = this.paths$.pipe(
      map((items) => items.length > 0 ? items[items.length - 1].label : Constant.EMPTY_VALUE)
    );
  }

  public getPathsAsObservable(): Observable<Array<NavigationTrailStructure>> {
    return this.paths$;
  }

  public getLastPathLabelAsObservable(): Observable<string> {
    return this.lastPathLabel$;
  }

  private buildNavigationTrail(route: ActivatedRoute): Array<NavigationTrailStructure> {
    const navigationTrails: Array<NavigationTrailStructure> = new Array<NavigationTrailStructure>();
    let currentRoute: ActivatedRoute = route;
    let trailPath: string = Constant.EMPTY_VALUE;

    while (currentRoute) {
      const nextTrailPath: string = this.generateNextTrail(trailPath, currentRoute);

      /* Grab the "trail" property from the app-routing.module route config,
      *  "trail" property need to be set in the route config file in order for this to work
      */
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

  private generateNextTrail(trailPath: string, currentRoute: ActivatedRoute): string {
    return `${trailPath}/${currentRoute.snapshot.url
      .map((segment) => segment.path)
      .join("/")}`
      .replace("//", "/");
  }
}
