import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BreadCrumbComponent} from "../../../shared/components/breadcrumb/bread-crumb.component";

@Component({
  selector: "app-home-about-us",
  standalone: true,
  imports: [CommonModule, BreadCrumbComponent],
  template: `
    <app-breadcrumb/>
    <div class="about-us">
      <div class="container">
        <div class="about-us__layout">
          <h5>About Us</h5>
          <div class="about-us__section">
            <section class="about-us__section-text">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat pretium turpis, in
                eleifend mi laoreet sed. Donec ipsum mauris, venenatis sit amet porttitor id, laoreet eu
                magna. In convallis diam volutpat libero tincidunt semper. Ut aliquet erat rutrum,
                venenatis
                lacus ut, ornare lectus. Quisque congue ex sit amet diam malesuada, eget laoreet quam
                molestie. In id elementum turpis. Curabitur quis tincidunt mauris.</p>

              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat pretium turpis, in
                eleifend mi laoreet sed. Donec ipsum mauris, venenatis sit amet porttitor id, laoreet eu
                magna. In convallis diam volutpat libero tincidunt semper. Ut aliquet erat rutrum,
                venenatis
                lacus ut, ornare lectus. Quisque congue ex sit amet diam malesuada, eget laoreet quam
                molestie. In id elementum turpis. Curabitur quis tincidunt mauris.</p>

              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat pretium turpis, in
                eleifend mi laoreet sed. Donec ipsum mauris, venenatis sit amet porttitor id, laoreet eu
                magna. In convallis diam volutpat libero tincidunt semper. Ut aliquet erat rutrum,
                venenatis
                lacus ut, ornare lectus. Quisque congue ex sit amet diam malesuada, eget laoreet quam
                molestie. In id elementum turpis. Curabitur quis tincidunt mauris.</p>

              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat pretium turpis, in
                eleifend mi laoreet sed. Donec ipsum mauris, venenatis sit amet porttitor id, laoreet eu
                magna. In convallis diam volutpat libero tincidunt semper. Ut aliquet erat rutrum,
                venenatis
                lacus ut, ornare lectus. Quisque congue ex sit amet diam malesuada, eget laoreet quam
                molestie. In id elementum turpis. Curabitur quis tincidunt mauris.</p>
            </section>
            <div class="about-us__image__section">
              <div class="about-us__image-item"></div>
              <div class="about-us__image-item"></div>
              <div class="about-us__image-item"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./home-about-us.component.scss"]
})
export class HomeAboutUsComponent {

}
