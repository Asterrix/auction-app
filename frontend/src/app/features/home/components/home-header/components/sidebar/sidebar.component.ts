import {CommonModule} from "@angular/common";
import {Component, OnInit} from "@angular/core";
import {RouterLink} from "@angular/router";
import {Observable} from "rxjs";
import {Api} from "../../../../../../shared/services/api.service";
import {CategoryService} from "../../../../../../shared/services/category.service";
import Category = Api.CategoryApi.Category;

@Component({
  selector: "home-header-sidebar",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  categories$: Observable<Array<Category> | undefined> | undefined;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.initCategories();
    this.categories$ = this.categoryService.getAllCategories();
  }
}
