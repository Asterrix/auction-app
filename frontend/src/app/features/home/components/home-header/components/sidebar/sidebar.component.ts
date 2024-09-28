import {CommonModule} from "@angular/common";
import {Component, Input} from "@angular/core";
import {RouterLink} from "@angular/router";
import {Observable} from "rxjs";
import {Api} from "../../../../../../shared/services/api.service";
import Category = Api.CategoryApi.Category;

@Component({
  selector: "home-header-sidebar",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent {
  @Input({required: true}) categories$: Observable<Array<Category> | undefined> | undefined;
}
