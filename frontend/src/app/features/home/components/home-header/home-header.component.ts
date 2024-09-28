import {CommonModule} from "@angular/common";
import {Component, Input} from "@angular/core";
import {Observable} from "rxjs";
import {LoaderComponent} from "../../../../shared/components/loader/loader.component";
import {Api} from "../../../../shared/services/api.service";
import {FeaturedItem} from "../../../../shared/services/api/item/item.interface";
import {HighlightComponent} from "./components/highlight/highlight.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import Category = Api.CategoryApi.Category;

@Component({
  selector: "home-header",
  standalone: true,
  imports: [CommonModule, SidebarComponent, HighlightComponent, LoaderComponent],
  templateUrl: "./home-header.component.html",
  styleUrls: ["./home-header.component.scss"]
})
export class HomeHeaderComponent {
  @Input({required: true}) categories$: Observable<Array<Category> | undefined> | undefined;
  @Input({required: true}) featuredItem$: Observable<FeaturedItem | undefined> | undefined;
}
