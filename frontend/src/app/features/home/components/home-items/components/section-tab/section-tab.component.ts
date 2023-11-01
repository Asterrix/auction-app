import {CommonModule} from "@angular/common";
import {Component} from "@angular/core";
import {RouterLink, RouterLinkActive} from "@angular/router";

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
export class SectionTabComponent {
  protected readonly Section = Section;
}
