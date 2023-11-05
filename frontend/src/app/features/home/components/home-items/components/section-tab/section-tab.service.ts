import {Injectable} from "@angular/core";
import {Params, Router} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";

export enum Section {
  Default = "new-arrivals",
  LastChance = "last-chance"
}

export enum SectionQueryParam {
  Section = "section"
}

export interface ItemTabSection {
  name: string;
  value: Section;
}

@Injectable({
  providedIn: "root"
})
export class SectionTabService {
  private activeSection = new BehaviorSubject<string>(Section.Default);
  private sections: Array<ItemTabSection> = [
    {name: "New Arrivals", value: Section.Default},
    {name: "Last Chance", value: Section.LastChance}
  ];
  private sectionSet: Set<string> = new Set<string>(this.sections.map(section => section.value));


  constructor(private router: Router) {
  }

  getActiveSectionValue(): string {
    return this.activeSection.getValue();
  }

  getActiveSection(): Observable<string> {
    return this.activeSection.asObservable();
  }

  getSectionList(): Array<ItemTabSection> {
    return this.sections;
  }

  handleSectionChange(section: string, params: Params): void {
    if (this.sectionExists(section)) {
      this.setActiveSection(params);
    } else {
      this.clearSectionQuery();
      this.setActiveSectionToDefault();
    }
  }

  private sectionExists(section: string): boolean {
    return this.sectionSet.has(section);
  }

  private clearSectionQuery(): void {
    this.router.navigate([], {queryParams: {section: null}, queryParamsHandling: "merge"}).then(null);
  }

  private setActiveSectionToDefault(): void {
    this.activeSection.next(Section.Default);
  }

  private setActiveSection(value: Params): void {
    this.activeSection.next(value[SectionQueryParam.Section]);
  }
}
