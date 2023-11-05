import {CommonModule} from "@angular/common";
import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {Api} from "../../shared/services/api.service";
import {CategoryService} from "../../shared/services/category.service";
import {ContentSectionComponent} from "./components/content-section/content-section.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import Category = Api.CategoryApi.Category;

@Component({
  selector: "app-shop",
  standalone: true,
  imports: [CommonModule, SidebarComponent, ContentSectionComponent],
  templateUrl: "./shop-page.component.html",
  styleUrls: ["./shop-page.component.scss"]
})
export class ShopPage implements OnInit {
  categories$: Observable<Array<Category> | undefined> | undefined;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.initialiseCategories();
  }

  private initialiseCategories(): void {
    this.categoryService.initCategories();
    this.categories$ = this.categoryService.getAllCategories();
  }
}
