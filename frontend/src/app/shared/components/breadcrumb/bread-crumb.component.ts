import {Component} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {BreadCrumbService} from "./services/bread-crumb.service";

@Component({
  selector: "app-breadcrumb",
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  template: `
    <div class="breadcrumb">
      <div class="container">
        <div class="breadcrumb__layout">
          <div class="breadcrumb__location">
            <p>{{breadCrumbService.label$ | async}}</p>
          </div>
          <div class="breadcrumb__navigation">
            <ng-container *ngFor="let item of breadCrumbService.items$ | async; let last = last">
              <a *ngIf="!last" [routerLink]="item.path" class="breadcrumb__navigation__item">{{ item.label }}</a>
              <span *ngIf="last" class="breadcrumb__navigation__item--active">{{ item.label }}</span>
              <span *ngIf="!last">
                <img alt="Navigation pointer"
                     height="10"
                     ngSrc="/assets/icons/chevron-right.svg"
                     width="10">
              </span>
            </ng-container>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./bread-crumb.component.scss"]
})
export class BreadCrumbComponent {
  constructor(protected breadCrumbService: BreadCrumbService) {
  }
}
