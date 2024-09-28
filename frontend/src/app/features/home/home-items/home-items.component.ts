import {Component, OnDestroy, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {HomeItemsTabComponent, Section, SectionQueryParam} from "./components/home-items-tab/home-items-tab.component";
import {ItemCardComponent} from "../../../shared/components/item-card/item-card.component";

@Component({
  selector: "app-home-items",
  standalone: true,
  imports: [CommonModule, HomeItemsTabComponent, ItemCardComponent],
  templateUrl: "./home-items.component.html",
  styleUrls: ["./home-items.component.scss"]
})
export class HomeItemsComponent implements OnInit, OnDestroy {
  activeSection: Section = Section.Default;
  queryParamSubscription: Subscription | undefined;
  protected readonly Section = Section;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.queryParamSubscription = this.route.queryParams.subscribe(value => {
      const queryParamValue = value[SectionQueryParam.SectionParam];

      if (queryParamValue != undefined) {
        this.activeSection = value[SectionQueryParam.SectionParam];
      } else {
        this.activeSection = Section.Default;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.queryParamSubscription) {
      this.queryParamSubscription.unsubscribe();
    }
  }
}
