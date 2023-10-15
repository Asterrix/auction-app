import {Component} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {SearchBarComponent} from "../search-bar/search-bar.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: "app-main-navbar",
  standalone: true,
  imports: [CommonModule, SearchBarComponent, NgOptimizedImage, RouterLink],
  template: `
    <div class="main-navbar">
      <div class="container">
        <div class="main-navbar__layout">

          <div class="main-navbar__logo">
            <img ngSrc="assets/logos/auction-app-logo-1.png" alt="Auction App logo" width="163" height="56"/>
          </div>

          <div class="main-navbar__search">
            <div>
              <app-search-bar/>
            </div>

            <div class="main-navbar__navigation">
              <ul>
                <li>
                  <a class="active" routerLink="/home">Home</a>
                </li>
                <li>
                  <a>Shop</a>
                </li>
                <li>
                  <a>My Account</a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./main-navbar.component.scss"]
})
export class MainNavbarComponent {

}
