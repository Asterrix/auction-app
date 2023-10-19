import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";

export enum Section {
  Default = "new-arrivals",
  LastChance = "last-chance"
}

export enum SectionQueryParam {
  Section = "section"
}

@Component({
  selector: "app-home-items-tab",
  standalone: true,
  imports: [CommonModule, RouterLinkActive, RouterLink],
  templateUrl: "./home-items-tab.component.html",
  styleUrls: ["./home-items-tab.component.scss"]
})
export class HomeItemsTabComponent {
  protected readonly Section = Section;
}
