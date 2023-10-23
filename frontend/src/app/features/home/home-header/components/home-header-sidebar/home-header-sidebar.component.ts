import {Component, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Category, ItemCategoryService} from "../services/item-category.service";

@Component({
  selector: "app-home-header-sidebar",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./home-header-sidebar.component.html",
  styleUrls: ["./home-header-sidebar.component.scss"]
})
export class HomeHeaderSidebarComponent implements OnInit {
  private _categories: Array<Category> = new Array<Category>();

  get categories(): Array<Category> {
    return this._categories;
  }

  constructor(private categoryService: ItemCategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.getListOfCategories().subscribe(categories => {
      this._categories = categories;
    });
  }
}
