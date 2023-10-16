import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ContentCardComponent} from "./components/content-card/content-card.component";
import {BreadCrumbComponent} from "../../../shared/components/breadcrumb/bread-crumb.component";

@Component({
  selector: "app-home-terms-conditions",
  standalone: true,
  imports: [CommonModule, ContentCardComponent, BreadCrumbComponent],
  template: `
    <app-breadcrumb/>
    <div class="terms-conditions">
      <div class="container">
        <div class="terms-conditions__layout">
          <div class="terms-conditions__container">
            <section class="terms-conditions__content">
              <app-content-card
                body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat pretium turpis, in eleifend mi
                laoreet sed. Donec ipsum mauris, venenatis sit amet porttitor id, laoreet eu magna. In convallis diam
                volutpat libero tincidunt semper. Ut aliquet erat rutrum, venenatis lacus ut, ornare lectus. Quisque
                congue ex sit amet diam malesuada, eget laoreet quam molestie. In id elementum turpis. Curabitur quis
                tincidunt mauris."
                title="Some title here"/>

              <app-content-card
                body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat pretium turpis, in eleifend mi
                laoreet sed. Donec ipsum mauris, venenatis sit amet porttitor id, laoreet eu magna. In convallis diam
                volutpat libero tincidunt semper. Ut aliquet erat rutrum, venenatis lacus ut, ornare lectus. Quisque
                congue ex sit amet diam malesuada, eget laoreet quam molestie. In id elementum turpis. Curabitur quis
                tincidunt mauris."
                title="Some title here"/>

              <app-content-card
                body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat pretium turpis, in
                eleifend mi
                laoreet sed. Donec ipsum mauris, venenatis sit amet porttitor id, laoreet eu magna. In
                convallis diam
                volutpat libero tincidunt semper. Ut aliquet erat rutrum, venenatis lacus ut, ornare
                lectus. Quisque
                congue ex sit amet diam malesuada, eget laoreet quam molestie. In id elementum turpis.
                Curabitur quis
                tincidunt mauris."
                title="Some title here"/>
            </section>
          </div>
        </div>
      </div>
    </div>`,
  styleUrls: ["./home-terms-conditions.component.scss"]
})
export class HomeTermsConditionsComponent {

}
