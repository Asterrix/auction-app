import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AnchorImageComponent} from "../anchor-image/anchor-image.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: "app-top-bar",
  standalone: true,
  imports: [CommonModule, AnchorImageComponent, RouterLink],
  template: `
    <div class="top-bar">
      <div class="top-bar__layout container">
        <div class="top-bar__social-media">
          <app-anchor-image
            class="top-bar__social-media__item"
            link="https://www.facebook.com/atlantbh"
            imageSource="assets/social-media/akar-icons_facebook-fill.svg"
            alt="Facebook"/>
          <app-anchor-image
            class="top-bar__social-media__item"
            link="https://www.instagram.com/atlantbh/"
            imageSource="assets/social-media/entypo-social_instagram-with-circle.svg"
            alt="Instagram"/>
          <app-anchor-image
            class="top-bar__social-media__item"
            link="https://twitter.com/atlantbh?lang=en"
            imageSource="assets/social-media/entypo-social_twitter-with-circle.svg"
            alt="Twitter"/>
        </div>

        <div class="top-bar__user-action">
          <a href="https://www.atlantbh.com/abh-internship/" class="font-size-small">Hi, Atlantbh</a>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./top-bar.component.scss"]
})
export class TopBarComponent {
}
