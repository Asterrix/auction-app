import {CommonModule} from "@angular/common";
import {Component} from "@angular/core";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {Observable} from "rxjs";
import {ItemTabSection, SectionTabService} from "./section-tab.service";



@Component({
  selector: "home-items-section-tab",
  standalone: true,
  imports: [CommonModule, RouterLinkActive, RouterLink],
  templateUrl: "./section-tab.component.html",
  styleUrls: ["./section-tab.component.scss"]
})
export class SectionTabComponent {
  section: Array<ItemTabSection> = this.sections.getSectionList();
  activeSection: Observable<string> = this.sections.getActiveSection();

  constructor(private sections: SectionTabService) {
  }
}
