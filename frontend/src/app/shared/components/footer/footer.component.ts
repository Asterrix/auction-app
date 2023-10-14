import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AnchorImageComponent} from "../anchor-image/anchor-image.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [CommonModule, AnchorImageComponent, RouterLink],
  template: `
    <div class="footer">
      <div class="container">
        <div class="footer__layout">

          <div class="footer__section">
            <h4 class="footer__section__title">Auction</h4>
            <ul class="footer__section__list">
              <li><a routerLink="home/about-us" class="footer__section__item">About Us</a></li>
              <li><a routerLink="home/terms-and-conditions" class="footer__section__item">Terms and Conditions</a></li>
              <li><a routerLink="home/privacy-policy" class="footer__section__item">Privacy and policy</a></li>
            </ul>
          </div>

          <div class="footer__section">
            <h4 class="footer__section__title">Get in touch</h4>
            <ul class="footer__section__list">
              <li><p class="footer__section__item footer__section__item--disabled">Call Us at &nbsp;&nbsp;+123 797-567-2535</p></li>
              <li><a class="footer__section__item footer__section__item--disabled">support@auction.com</a></li>
              <ul class="footer__section__list footer__follow-us">
                <li>
                  <app-anchor-image
                    class="footer__follow-us--hover"
                    link="https://www.facebook.com/atlantbh"
                    imageSource="assets/social-media/akar-icons_facebook-fill.svg"
                    alt="Facebook"/>
                </li>
                <li>
                  <app-anchor-image
                    class="footer__follow-us--hover"
                    link="https://www.instagram.com/atlantbh/"
                    imageSource="assets/social-media/entypo-social_instagram-with-circle.svg"
                    alt="Instagram"/>

                </li>
                <li>
                  <app-anchor-image
                    class="footer__follow-us--hover"
                    link="https://twitter.com/atlantbh?lang=en"
                    imageSource="assets/social-media/entypo-social_twitter-with-circle.svg"
                    alt="Twitter"/>
                </li>
              </ul>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent {

}
