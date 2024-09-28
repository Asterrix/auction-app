import {Component, OnDestroy, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Category, ItemCategoryService} from "../services/item-category.service";
import {Subscription} from "rxjs";

@Component({
  selector: "app-home-header-sidebar",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./home-header-sidebar.component.html",
  styleUrls: ["./home-header-sidebar.component.scss"]
})
export class HomeHeaderSidebarComponent implements OnInit, OnDestroy {
  private _getListOfCategoriesSub: Subscription | undefined;

  constructor(private categoryService: ItemCategoryService) {
  }

  private _categories: Array<Category> = new Array<Category>();

  get categories(): Array<Category> {
    return this._categories;
  }

  ngOnInit(): void {
    this._getListOfCategoriesSub = this.categoryService.getListOfCategories().subscribe(categories => {
      this._categories = categories;
    });
  }

  ngOnDestroy(): void {
    if (this._getListOfCategoriesSub != undefined) {
      this._getListOfCategoriesSub.unsubscribe();
    }
  }
}
