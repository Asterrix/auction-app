import {CommonModule} from "@angular/common";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Params, RouterLink, RouterLinkActive} from "@angular/router";
import {Subscription} from "rxjs";

export enum Section {
  Default = "new-arrivals",
  LastChance = "last-chance"
}

export enum SectionQueryParam {
  Section = "section"
}

@Component({
  selector: "home-items-section-tab",
  standalone: true,
  imports: [CommonModule, RouterLinkActive, RouterLink],
  templateUrl: "./section-tab.component.html",
  styleUrls: ["./section-tab.component.scss"]
})
export class SectionTabComponent implements OnInit, OnDestroy {
  sections: ({ name: string, value: Section })[] = [
    {name: "New Arrivals", value: Section.Default},
    {name: "Last Chance", value: Section.LastChance}
  ];
  activeSection: Section = Section.Default;
  private sectionSet: Set<string> = new Set<string>(this.sections.map(section => section.value));
  private queryParamSub: Subscription | undefined;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscribeToQueryParamChanges();
  }

  ngOnDestroy(): void {
    this.queryParamsUnsubscribe();
  }

  private queryParamsUnsubscribe(): void {
    this.queryParamSub?.unsubscribe();
  }

  private subscribeToQueryParamChanges(): void {
    this.queryParamSub = this.activatedRoute.queryParams.subscribe((params: Params): void => {
      const section: string = params[SectionQueryParam.Section];
      this.handleSectionChange(section, params);
    });
  }

  private handleSectionChange(section: string, params: Params): void {
    if (this.sectionExists(section)) {
      this.setActiveSection(params);
    } else {
      this.setActiveSectionToDefault();
    }
  }

  private setActiveSectionToDefault(): void {
    this.activeSection = Section.Default;
  }

  private setActiveSection(value: Params): void {
    this.activeSection = value[SectionQueryParam.Section];
  }

  private sectionExists(section: string): boolean {
    return this.sectionSet.has(section);
  }
}
