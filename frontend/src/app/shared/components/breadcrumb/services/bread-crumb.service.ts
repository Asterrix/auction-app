import {Injectable} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {distinctUntilChanged, map} from "rxjs/operators";

export interface BreadCrumbItem {
  label: string;
  path: string | null;
}

@Injectable({
  providedIn: "root"
})
export class BreadCrumbService {
  public items$: Observable<Array<BreadCrumbItem>>;
  public label$: Observable<string>;

  constructor(private _router: Router, private _route: ActivatedRoute) {
    this.items$ = this._router.events.pipe(
      distinctUntilChanged(),
      map(_ => this._buildBreadCrumbList(this._route.root))
    );

    this.label$ = this.items$.pipe(
      map((items) => items.length > 0 ? items[items.length - 1].label : "")
    );
  }

  private _buildBreadCrumbList(route: ActivatedRoute): Array<BreadCrumbItem> {
    const breadcrumbs: Array<BreadCrumbItem> = new Array<BreadCrumbItem>();
    let currentRoute: ActivatedRoute = route;
    let breadcrumbPath: string = "";

    while (currentRoute) {
      const nextBreadcrumbPath: string = this._generateNextBreadCrumbPath(breadcrumbPath, currentRoute);

      const breadcrumbData = currentRoute.routeConfig?.data?.["breadcrumb"];

      if (breadcrumbData) {
        const label: string = breadcrumbData, path: string = nextBreadcrumbPath;
        breadcrumbs.push({label: label, path: path});
      }

      if (currentRoute.firstChild) {
        currentRoute = currentRoute.firstChild;
        breadcrumbPath = nextBreadcrumbPath;
      } else {
        break;
      }
    }

    return breadcrumbs;
  }

  private _generateNextBreadCrumbPath(breadcrumbPath: string, currentRoute: ActivatedRoute): string {
    return `${breadcrumbPath}/${currentRoute.snapshot.url
      .map((segment) => segment.path)
      .join("/")}`
      .replace("//", "/");
  }
}
