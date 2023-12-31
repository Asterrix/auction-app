import {CommonModule} from "@angular/common";
import {Component, inject, Input} from "@angular/core";
import {Router, RouterLink} from "@angular/router";
import {Category} from "../../../../../../shared/services/api/category/category.type";
import {CategoryFilterService} from "../../../../../shop/components/sidebar/filter/category-filter.service";
import {ShopRouteEndpoint} from "../../../../../shop/shop-routes";


@Component({
  selector: "home-header-sidebar",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent {
  @Input({required: true}) categories!: Category[];
  protected readonly ShopRouteEndpoint = ShopRouteEndpoint;
  private readonly categoryFilterService = inject(CategoryFilterService);
  private readonly router: Router = inject(Router);

  protected onCategoryClick = async (category: Category): Promise<void> => {
    this.categoryFilterService.initializeCategories(this.categories);
    await this.categoryFilterService.includeCategory(category.name);
    await this.router.navigate(["/", ShopRouteEndpoint.Shop], {queryParamsHandling: "merge"});
  };
}
